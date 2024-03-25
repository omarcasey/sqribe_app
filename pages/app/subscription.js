import AppShell from "@/components/App/AppShell";
import withAuth from "@/components/App/withAuth";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Divider,
  Modal,
  ModalContent,
  Switch,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaCircleInfo } from "react-icons/fa6";
import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
const Stripe = require("stripe");
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY);

const Subscription = () => {
  const isDarkMode = useSelector((state) => state.user.darkMode);
  const uid = useSelector((state) => state.user.auth.uid);
  const userData = useSelector((state) => state.user.data);
  const subscription = userData?.subscriptions[0];
  const [selected, setSelected] = useState(true);
  const {
    isOpen: isOpenCancelSubscriptionModal,
    onOpen: onOpenCancelSubscriptionModal,
    onOpenChange: onOpenChangeCancelSubscriptionModal,
    onClose: onCloseCancelSubscriptionModal,
  } = useDisclosure();
  const {
    isOpen: isOpenStopCancelSubscriptionModal,
    onOpen: onOpenStopCancelSubscriptionModal,
    onOpenChange: onOpenChangeStopCancelSubscriptionModal,
    onClose: onCloseStopCancelSubscriptionModal,
  } = useDisclosure();
  let basicButtonLabel;
  let creatorButtonLabel;
  let businessButtonLabel;

  if (subscription.planID === "Basic Plan") {
    if (subscription.status === "Cancelled") {
      basicButtonLabel = "Stop Cancellation";
    } else {
      basicButtonLabel = "Cancel Subscription";
    }
  } else if (
    subscription.planID === "Creator Plan" ||
    subscription.planID === "Business Plan"
  ) {
    basicButtonLabel = "Downgrade";
  } else {
    basicButtonLabel = "Select Plan";
  }

  if (subscription.planID === "Creator Plan") {
    if (subscription.status === "Cancelled") {
      creatorButtonLabel = "Stop Cancellation";
    } else {
      creatorButtonLabel = "Cancel Subscription";
    }
  } else if (subscription.planID === "Basic Plan") {
    creatorButtonLabel = "Upgrade";
  } else if (subscription.planID === "Business Plan") {
    creatorButtonLabel = "Downgrade";
  } else {
    creatorButtonLabel = "Select Plan";
  }

  if (subscription.planID === "Business Plan") {
    if (subscription.status === "Cancelled") {
      businessButtonLabel = "Stop Cancellation";
    } else {
      businessButtonLabel = "Cancel Subscription";
    }
  } else if (
    subscription.planID === "Creator Plan" ||
    subscription.planID === "Basic Plan"
  ) {
    businessButtonLabel = "Upgrade";
  } else {
    businessButtonLabel = "Select Plan";
  }

  function calculateDaysLeft(endDate) {
    const currentDate = new Date();
    const differenceInTime = endDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    if (differenceInDays === 0) {
      return "Soon";
    } else {
      return differenceInDays + " days";
    }
  }
  const cancelSubscription = async () => {
    console.log(process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY);
    try {
      const subscriptionresult = await stripe.subscriptions.update(
        subscription.subscriptionID,
        {
          cancel_at_period_end: true,
        }
      );
      console.log(subscriptionresult);
      onCloseCancelSubscriptionModal();
    } catch (err) {
      console.log(err);
    }

    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      const currentData = docSnap.data();
      await updateDoc(userRef, {
        subscriptions: [
          {
            ...currentData.subscriptions[0],
            status: "Cancelled",
          },
          ...currentData.subscriptions.slice(1),
        ],
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const stopCancelSubscription = async () => {
    try {
      const subscriptionresult = await stripe.subscriptions.update(
        subscription.subscriptionID,
        {
          cancel_at_period_end: false,
        }
      );
      console.log(subscriptionresult);
      onCloseStopCancelSubscriptionModal();
    } catch (err) {
      console.log(err);
    }

    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      const currentData = docSnap.data();
      await updateDoc(userRef, {
        subscriptions: [
          {
            ...currentData.subscriptions[0],
            status: "Active",
          },
          ...currentData.subscriptions.slice(1),
        ],
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const changeSubscription = async ({ newPriceId }) => {
    try {
      const getSubscriptionInfo = await stripe.subscriptions.retrieve(
        subscription.subscriptionID
      );
      const subscriptionItemID = getSubscriptionInfo.items.data[0].id;
      console.log(subscriptionItemID);
      console.log(newPriceId);

      const price = await stripe.prices.retrieve(newPriceId);
      const product = await stripe.products.retrieve(price.product);
      console.log(product.name);

      let newTotalMinutes = 0;
      let planName = ""; // Declare planName variable here
      if (product.name === "Basic Plan") {
        newTotalMinutes = 25;
        planName = "Basic Plan"; // Set planName based on product name
      } else if (product.name === "Creator Plan") {
        newTotalMinutes = 100;
        planName = "Creator Plan"; // Set planName based on product name
      } else if (product.name === "Business Plan") {
        newTotalMinutes = 500;
        planName = "Business Plan"; // Set planName based on product name
      }

      const subscriptionresult = await stripe.subscriptions.update(
        subscription.subscriptionID,
        {
          items: [
            {
              id: subscriptionItemID,
              price: newPriceId,
            },
          ],
          cancel_at_period_end: false,
        }
      );
      console.log(subscriptionresult);

      try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        const currentData = docSnap.data();
        await updateDoc(userRef, {
          subscriptions: [
            {
              ...currentData.subscriptions[0],
              planID: planName, // Use planName variable here
              status: "Active",
              usage: {
                ...currentData.subscriptions[0].usage,
                totalSeconds: newTotalMinutes * 60,
                remainingSeconds: newTotalMinutes * 60 - currentData.subscriptions[0].usage.usedSeconds,
              },
            },
            ...currentData.subscriptions.slice(1),
          ],
        });
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppShell>
      <div className="w-full">
        <div className="flex flex-col items-center pb-24 pt-10">
          <Card className="flex flex-col w-full max-w-[90%]">
            <div className="flex flex-row justify-between items-center px-10 my-4 mb-6">
              <h1 className="text-xl font-medium">Subscription</h1>
              <form id="stripePortal" action="/api/stripe-portal" method="POST">
                <input
                  type="hidden"
                  id="customerStripeId"
                  name="customerStripeId"
                  value={userData.stripeId}
                />
                <Button type="submit">Manage Subscription</Button>
              </form>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Subscription plan</p>
              <p>{subscription?.planID}</p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Subscription status</p>
              <div
                className={`${
                  subscription.status === "Active"
                    ? "bg-green-300"
                    : "bg-red-300"
                } rounded-full py-[2px] px-2 text-black text-xs font-medium`}
              >
                {subscription?.status}
              </div>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Minutes used</p>
              <p className="mr-4">
                {(subscription?.usage.usedSeconds / 60).toFixed(2)}
              </p>
              <p>
                ({(subscription?.usage.totalSeconds / 60).toFixed(0)} included)
              </p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Next minute reset in</p>
              {subscription?.endDate && (
                <p>{calculateDaysLeft(subscription?.endDate.toDate())}</p>
              )}
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Billing Period</p>
              <p className="mr-5">{subscription?.period}</p>
              <p className="text-blue-400 font-medium text-xs border rounded-lg px-2 py-[2px] border-indigo-800 hover:cursor-pointer">
                Switch to{" "}
                {subscription?.period === "Monthly" ? "Yearly" : "Monthly"}
              </p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Next invoice in</p>
              {subscription?.endDate && (
                <p>{calculateDaysLeft(subscription?.endDate.toDate())}</p>
              )}
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <p className="w-[27rem]">Next invoice</p>
              <p>$35</p>
            </div>
            <Divider className="" />
            <div className="flex flex-row items-center px-10 my-4 text-sm">
              <div className="flex flex-col">
                <p className="w-[27rem]">Enable usage based billing</p>
                <p className="text-xs text-foreground-500">
                  (Surpass 100 minutes for $0.8 per extra minute)
                </p>
              </div>
              <Switch aria-label="Usage based billing" size="sm" />
            </div>
          </Card>
          <h1 className="w-[90%] mt-16 text-2xl font-semibold ml-5 text-foreground">
            Plans
          </h1>
          <div className="mx-auto max-w-[90%] text-foreground pt-4 flex-1">
            <div className="flex justify-center items-center mb-8">
              <p
                className={`mr-3 ${
                  selected ? "text-foreground-500" : ""
                } transition-all`}
              >
                Monthly
              </p>
              <Switch
                isSelected={selected}
                onValueChange={setSelected}
                aria-label="Monthly/Annual"
              />
              <p
                className={`mr-3 ${
                  selected ? "" : "text-foreground-500"
                } transition-all`}
              >
                Annually
              </p>
              <div
                className={`rounded-full py-0 px-2 border text-sm ${
                  selected
                    ? "text-indigo-500 border-indigo-500"
                    : "text-foreground-500 border-foreground-500"
                }`}
              >
                20% off
              </div>
            </div>
            <div className="gap-8 justify-center grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 px-12 md:px-4">
              <Card className="p-4 px-6">
                <div className="flex flex-row justify-between items-center mb-2">
                  <h1 className="font-semibold text-xl">Basic</h1>
                  {subscription.planID === "Basic Plan" &&
                  subscription.status === "Cancelled" ? (
                    <div className="rounded-md py-0 px-2 border text-sm text-red-500 border-red-500">
                      Will be cancelled
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <p className="text-foreground-500 text-sm mb-6">
                  For small to medium sized buisness that have a smaller target
                  audience
                </p>
                <p className="text-3xl font-semibold">
                  {selected ? "$25" : "$30"} / month
                </p>
                <p className="font-semibold mb-6">+ $1 per extra minute</p>
                <ul className="flex flex-col gap-2 text-sm mb-6 flex-1 text-foreground-500">
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>25 min of translated video</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>4k Export Quality</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>No watermark</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>Translate into 130+ languages</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>Automatic AI transcription</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>Advanced AI translation</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>
                      Voice cloning for 28 languages with 1000 word vocabulary
                    </p>
                  </li>
                </ul>
                {subscription.planID === "Free Trial" && (
                  <form
                    id="checkoutForm"
                    action="/api/checkout-session"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      id="priceID"
                      name="priceID"
                      value={
                        selected
                          ? "price_1OvnitLgT8zvXr8nlvm3sPMN"
                          : "price_1OvniMLgT8zvXr8n5J04Pogc"
                      }
                    />
                    <input
                      type="hidden"
                      id="customerEmail"
                      name="customerEmail"
                      value={userData.email}
                    />
                    <input
                      type="hidden"
                      id="customerStripeId"
                      name="customerStripeId"
                      value={userData.stripeId}
                    />
                    <Button type="submit" color="default" fullWidth>
                      Select Plan
                    </Button>
                  </form>
                )}
                {subscription.planID === "Basic Plan" && (
                  <Button
                    color="default"
                    fullWidth
                    onPress={
                      subscription.status === "Active"
                        ? onOpenCancelSubscriptionModal
                        : onOpenStopCancelSubscriptionModal
                    }
                  >
                    {subscription.status === "Active"
                      ? "Cancel Subscription"
                      : "Stop Cancellation"}
                  </Button>
                )}
                {(subscription.planID === "Creator Plan" ||
                  subscription.planID === "Business Plan") && (
                  <Button
                    color="default"
                    fullWidth
                    onPress={() =>
                      changeSubscription({
                        newPriceId: selected
                          ? "price_1OvnitLgT8zvXr8nlvm3sPMN"
                          : "price_1OvniMLgT8zvXr8n5J04Pogc",
                      })
                    }
                  >
                    Downgrade
                  </Button>
                )}
              </Card>
              <Card className="p-4 px-6 border border-indigo-700">
                <div className="flex flex-row justify-between items-center mb-2">
                  <h1 className="font-semibold text-xl">Creator</h1>
                  {subscription.planID === "Creator Plan" &&
                  subscription.status === "Cancelled" ? (
                    <div className="rounded-md py-0 px-2 border text-sm text-red-500 border-red-500">
                      Will be cancelled
                    </div>
                  ) : (
                    <div className="rounded-md py-0 px-2 border text-sm text-blue-500 border-blue-500">
                      Most Popular
                    </div>
                  )}
                </div>
                <p className="text-foreground-500 text-sm mb-6">
                  For small to medium sized buisness that have a smaller target
                  audience
                </p>
                <p className="text-3xl font-semibold">
                  {selected ? "$60" : "$75"} / month
                </p>
                <p className="font-semibold mb-6">+ $0.8 per extra minute</p>
                <ul className="flex flex-col gap-2 text-sm mb-6 flex-1 text-foreground-500">
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>100 min of translated video</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>Voice cloning with unlimited vocabulary</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>SRT download</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>Video Captions / Subtitles</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>
                      Access to Sqribe Clips
                      <br />
                      (Advanced Social Media Clip Generator)
                    </p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>Unlimited Speech Synthesis (Text to speech)</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>AI avatar</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>Video Editor</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck
                      size={12}
                      className="mr-2 flex-shrink-0 text-blue-500"
                    />
                    <p>
                      Remove filler words like &quot;uh&quot; and &quot;um&quot;
                    </p>
                  </li>
                </ul>
                {subscription.planID === "Free Trial" && (
                  <form
                    id="checkoutForm"
                    action="/api/checkout-session"
                    method="POST"
                  >
                    <input
                      type="hidden"
                      id="priceID"
                      name="priceID"
                      value={
                        selected
                          ? "price_1OwozkLgT8zvXr8nTFy6aNXM"
                          : "price_1OwozILgT8zvXr8n3iaevJTK"
                      }
                    />
                    <input
                      type="hidden"
                      id="customerEmail"
                      name="customerEmail"
                      value={userData.email}
                    />
                    <input
                      type="hidden"
                      id="customerStripeId"
                      name="customerStripeId"
                      value={userData.stripeId}
                    />
                    <Button type="submit" color="primary" fullWidth>
                      Select Plan
                    </Button>
                  </form>
                )}
                {subscription.planID === "Creator Plan" && (
                  <Button
                    color="primary"
                    fullWidth
                    onPress={
                      subscription.status === "Active"
                        ? onOpenCancelSubscriptionModal
                        : onOpenStopCancelSubscriptionModal
                    }
                  >
                    {subscription.status === "Active"
                      ? "Cancel Subscription"
                      : "Stop Cancellation"}
                  </Button>
                )}
                {subscription.planID === "Basic Plan" && (
                  <Button
                    color="primary"
                    onPress={() =>
                      changeSubscription({
                        newPriceId: selected
                          ? "price_1OwozkLgT8zvXr8nTFy6aNXM"
                          : "price_1OwozILgT8zvXr8n3iaevJTK",
                      })
                    }
                    fullWidth
                  >
                    {creatorButtonLabel}
                  </Button>
                )}
              </Card>
              <Card className="p-4 px-6">
                <h1 className="font-semibold text-xl mb-2">Business</h1>
                <p className="text-foreground-500 text-sm mb-6">
                  For small to medium sized buisness that have a smaller target
                  audience
                </p>
                <p className="text-3xl font-semibold">
                  {selected ? "$250" : "$300"} / month
                </p>
                <p className="font-semibold mb-6">+ $0.5 per extra minute</p>
                <ul className="flex flex-col gap-2 text-sm mb-6 flex-1 text-foreground-500">
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>500 min of translated video</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>4k Export Quality</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>No watermark</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>Translate into 130+ languages</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>Automatic AI transcription</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>Advanced AI translation</p>
                  </li>
                  <li className="flex flex-row items-center">
                    <FaCheck size={12} className="mr-2 flex-shrink-0" />
                    <p>
                      Voice cloning for 28 languages with 1000 word vocabulary
                    </p>
                  </li>
                </ul>
                <Button color="default">{businessButtonLabel}</Button>
              </Card>
            </div>
          </div>
          <h2 className="w-[90%] mt-16 text-2xl font-semibold ml-5 text-foreground mb-6">
            Pricing FAQ
          </h2>
          <div className="max-w-[90%] w-full">
            <Accordion selectionMode="multiple" className="">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="What are the main features of Sqribe?"
                className=""
              >
                <p className="text-foreground-500">
                  The following features are currently available in our product:
                  Automated speech-to-text, translation and voiceover: Create a
                  transcript, translation, and voice-over for your video. Voice
                  cloning: Copy the voice from the original video to the
                  translated version. Multiple speakers: Assign a unique voice
                  to each speaker in the video. ubtitles: Download the
                  transcript and translation in SRT format. AI rewriting: Adjust
                  the speed of speech by rewriting segments that are too long in
                  the translation. Multi-lingual projects: Translate your video
                  into several languages in one click.Upload SRT: Upload SRT
                  Files for achieving more accuracy in translation or
                  transcription. Lip-sync in Beta: Get synchronized mouth
                  movements with the audio track in a translated video.
                </p>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 2"
                title="How many languages do you support?"
              >
                <p className="text-foreground-500">
                  With Rask AI, you can translate from nearly any language to
                  over 130 languages. Our Voice Cloning feature offers a
                  human-like experience and is currently available when dubbing
                  from any source language to the following 29 languages:
                  English, Japanese, Chinese, German, Hindi, French, Korean,
                  Portuguese, Italian, Spanish, Indonesian, Dutch, Turkish,
                  Filipino, Polish, Ukrainian, Swedish, Bulgarian, Romanian,
                  Arabic, Czech, Greek, Finnish, Croatian, Malay, Slovak,
                  Danish, Tamil, Russian.
                </p>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Accordion 3"
              >
                3
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenCancelSubscriptionModal}
        onOpenChange={onOpenChangeCancelSubscriptionModal}
        className={`${isDarkMode ? "dark" : "light"}`}
        size="lg"
      >
        <ModalContent className="">
          {(onCloseCancelSubscriptionModal) => (
            <div className="flex flex-col p-6 text-foreground">
              <h2 className="text-lg mb-4">Cancel Subscription</h2>
              <p className="text-foreground-500 text-sm mb-6">
                Do you really want to cancel your subscription at the next
                billing interval?
              </p>
              <div className="bg-foreground-100 rounded-lg p-4 flex items-center">
                <FaCircleInfo size={20} className="mr-6 text-foreground-400" />
                <p className="text-foreground-500 text-sm pr-6">
                  Unused minutes are not preserved and access to cloned voices
                  will be lost.
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6">
                <Button
                  color="default"
                  onPress={onCloseCancelSubscriptionModal}
                  className="mr-4"
                >
                  Close
                </Button>
                <Button color="primary" onPress={cancelSubscription}>
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenStopCancelSubscriptionModal}
        onOpenChange={onOpenChangeStopCancelSubscriptionModal}
        className={`${isDarkMode ? "dark" : "light"}`}
        size="lg"
      >
        <ModalContent className="">
          {(onCloseStopCancelSubscriptionModal) => (
            <div className="flex flex-col p-6 text-foreground">
              <h2 className="text-lg mb-4">Stop Cancel Subscription</h2>
              <p className="text-foreground-500 text-sm mb-6">
                Do you really want to cancel your subscription at the next
                billing interval?
              </p>
              <div className="bg-foreground-100 rounded-lg p-4 flex items-center">
                <FaCircleInfo size={20} className="mr-6 text-foreground-400" />
                <p className="text-foreground-500 text-sm pr-6">
                  Unused minutes are not preserved and access to cloned voices
                  will be lost.
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6">
                <Button
                  color="default"
                  onPress={onCloseStopCancelSubscriptionModal}
                  className="mr-4"
                >
                  Close
                </Button>
                <Button color="primary" onPress={stopCancelSubscription}>
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </AppShell>
  );
};

export default withAuth(Subscription);
