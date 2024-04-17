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
  const subscription = userData?.subscription;
  const [selected, setSelected] = useState(subscription.period === "Yearly");
  const [selectedPriceID, setSelectedPriceID] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
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
  const {
    isOpen: isOpenChangeSubscriptionModal,
    onOpen: onOpenChangeSubscriptionModal,
    onOpenChange: onOpenChangeChangeSubscriptionModal,
    onClose: onCloseChangeSubscriptionModal,
  } = useDisclosure();

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
    setLoadingSubscription(true);
    try {
      const subscriptionresult = await stripe.subscriptions.update(
        subscription.subscriptionID,
        {
          cancel_at_period_end: true,
        }
      );
      console.log(subscriptionresult);

      const cancelAt = new Date(subscriptionresult.cancel_at * 1000);
      console.log("This cancels at:", cancelAt);

      // Extract the customer's account balance
      const customer = await stripe.customers.retrieve(userData.stripeId);
      console.log("Customer:", customer);
      const accountBalance = customer.balance / 100; // Convert amount from cents to dollars

      console.log("Account credit:", accountBalance);

      // Initialize variables for upcoming invoice details
      let nextInvoiceDate, invoicePeriodStart, nextInvoiceAmount;

      try {
        // Retrieve the upcoming invoice
        const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
          subscription: subscription.subscriptionID,
        });

        // Extract necessary information from the upcoming invoice
        nextInvoiceDate = new Date(upcomingInvoice.period_end * 1000);
        invoicePeriodStart = new Date(upcomingInvoice.period_start * 1000);
        nextInvoiceAmount = upcomingInvoice.amount_due / 100; // Convert amount from cents to dollars

        console.log("This invoice start:", invoicePeriodStart);
        console.log("Next invoice date:", nextInvoiceDate);
        console.log("Next invoice amount:", nextInvoiceAmount);
      } catch (error) {
        // Handle the case where there are no upcoming invoices
        console.error("No upcoming invoice found:", error);
        nextInvoiceDate = null;
        invoicePeriodStart = null;
        nextInvoiceAmount = 0;
      }

      try {
        // Update the user document with subscription and invoice details
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        const currentData = docSnap.data();
        await updateDoc(userRef, {
          subscription: {
            ...currentData.subscription,
            nextInvoiceDate: nextInvoiceDate,
            invoicePeriodStart: invoicePeriodStart,
            nextInvoiceAmount: nextInvoiceAmount,
            accountBalance: accountBalance,
            cancelAt: cancelAt,
            status: "Cancelling",
          },
        });
      } catch (e) {
        console.error("Error updating document: ", e);
      }

      onCloseCancelSubscriptionModal();
    } catch (err) {
      console.log(err);
    }

    setLoadingSubscription(false);
  };

  const stopCancelSubscription = async () => {
    setLoadingSubscription(true);
    try {
      const subscriptionresult = await stripe.subscriptions.update(
        subscription.subscriptionID,
        {
          cancel_at_period_end: false,
        }
      );

      const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
        subscription: subscription.subscriptionID,
      });
      const nextInvoiceDate = new Date(upcomingInvoice.period_end * 1000);
      const invoicePeriodStart = new Date(upcomingInvoice.period_start * 1000);
      console.log("This invoice start:", invoicePeriodStart);
      console.log("Next invoice date:", nextInvoiceDate);

      const nextInvoiceAmount = upcomingInvoice.amount_due / 100; // Convert amount from cents to dollars
      console.log("Next invoice amount:", nextInvoiceAmount);

      // Extract the customer's account balance
      const customer = await stripe.customers.retrieve(userData.stripeId);
      const accountBalance = customer.balance / 100; // Convert amount from cents to dollars

      try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        const currentData = docSnap.data();
        await updateDoc(userRef, {
          subscription: {
            ...currentData.subscription,
            invoicePeriodStart: invoicePeriodStart,
            nextInvoiceDate: nextInvoiceDate,
            nextInvoiceAmount: nextInvoiceAmount,
            accountBalance: accountBalance,
            cancelAt: null,
            status: "Active",
          },
        });
      } catch (e) {
        console.error("Error updating document: ", e);
      }
      console.log(subscriptionresult);
      onCloseStopCancelSubscriptionModal();
    } catch (err) {
      console.log(err);
    }

    setLoadingSubscription(false);
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

      const upcomingInvoice = await stripe.invoices.retrieveUpcoming({
        subscription: subscription.subscriptionID,
      });
      const nextInvoiceDate = new Date(upcomingInvoice.period_end * 1000);
      const invoicePeriodStart = new Date(upcomingInvoice.period_start * 1000);
      console.log("This invoice start:", invoicePeriodStart);
      console.log("Next invoice date:", nextInvoiceDate);

      const nextInvoiceAmount = upcomingInvoice.amount_due / 100; // Convert amount from cents to dollars
      console.log("Next invoice amount:", nextInvoiceAmount);

      // Extract the customer's account balance
      const customer = await stripe.customers.retrieve(userData.stripeId);
      const accountBalance = customer.balance / 100; // Convert amount from cents to dollars

      console.log("Account credit:", accountBalance);

      let periodInnit =
        subscriptionresult.plan.interval === "year" ? "Yearly" : "Monthly";
      console.log("Interval: " + getSubscriptionInfo.plan.interval);
      console.log("Period: " + periodInnit);

      try {
        const userRef = doc(db, "users", uid);
        const docSnap = await getDoc(userRef);
        const currentData = docSnap.data();

        let newResetDate = subscription.resetDate; // Default to existing resetDate
        let newUsedSeconds = subscription.usage.usedSeconds;

        // Update resetDate only if the period is different
        if (periodInnit !== subscription.period) {
          const nextMonth = new Date(invoicePeriodStart);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          newResetDate = nextMonth;
          newUsedSeconds = 0; // Reset usedSeconds if period changes
        }

        await updateDoc(userRef, {
          subscription: {
            ...currentData.subscription,
            planID: planName, // Use planName variable here
            status: "Active",
            usage: {
              ...currentData.subscription.usage,
              totalSeconds: newTotalMinutes * 60,
              remainingSeconds:
                newTotalMinutes * 60 -
                newUsedSeconds,
              usedSeconds: newUsedSeconds,
            },
            invoicePeriodStart: invoicePeriodStart,
            nextInvoiceDate: nextInvoiceDate,
            nextInvoiceAmount: nextInvoiceAmount,
            accountBalance: accountBalance,
            period: periodInnit,
            resetDate: newResetDate,
          },
        });
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPriceIDSwitchPeriod = () => {
    if (subscription.planID === "Basic Plan") {
      if (subscription.period === "Yearly") {
        return "price_1OvniMLgT8zvXr8n5J04Pogc";
      } else {
        return "price_1OvnitLgT8zvXr8nlvm3sPMN";
      }
    } else if (subscription.planID === "Creator Plan") {
      if (subscription.period === "Yearly") {
        return "price_1OwozILgT8zvXr8n3iaevJTK";
      } else {
        return "price_1OwozkLgT8zvXr8nTFy6aNXM";
      }
    } else if (subscription.planID === "Business Plan") {
      if (subscription.period === "Yearly") {
        return "price_1OycklLgT8zvXr8n2utTNsqB";
      } else {
        return "price_1OyclCLgT8zvXr8nnPbItN3V";
      }
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
                    : subscription.status === "Trial"
                    ? "bg-orange-300"
                    : "bg-red-300"
                } rounded-full py-[2px] px-2 text-black text-xs font-medium mr-5`}
              >
                {subscription?.status}
              </div>
              {subscription?.status === "Cancelling" && (
                <p
                  className="text-green-600 font-medium text-xs border rounded-lg px-2 py-[2px] border-green-600 hover:cursor-pointer"
                  onClick={() => {
                    onOpenStopCancelSubscriptionModal();
                  }}
                >
                  Resume Subscription
                </p>
              )}
            </div>
            {subscription?.status === "Cancelling" && (
              <>
                <Divider className="" />
                <div className="flex flex-row items-center px-10 my-4 text-sm">
                  <p className="w-[27rem]">Cancels in</p>
                  {subscription?.cancelAt && (
                    <p>{calculateDaysLeft(subscription?.cancelAt.toDate())}</p>
                  )}
                </div>
              </>
            )}
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
            {subscription?.planID !== "Free Trial" && (
              <>
                <Divider className="" />
                <div className="flex flex-row items-center px-10 my-4 text-sm">
                  <p className="w-[27rem]">Next minute reset in</p>
                  {subscription?.resetDate && (
                    <p>{calculateDaysLeft(subscription?.resetDate.toDate())}</p>
                  )}
                </div>
                <Divider className="" />
                <div className="flex flex-row items-center px-10 my-4 text-sm">
                  <p className="w-[27rem]">Billing Period</p>
                  <p className="mr-5">{subscription?.period}</p>
                  {subscription?.status === "Active" && (
                    <p
                      className="text-blue-400 font-medium text-xs border rounded-lg px-2 py-[2px] border-indigo-800 hover:cursor-pointer"
                      onClick={() => {
                        setSelectedPriceID(getPriceIDSwitchPeriod());
                        onOpenChangeSubscriptionModal();
                      }}
                    >
                      Switch to{" "}
                      {subscription?.period === "Monthly"
                        ? "Yearly"
                        : "Monthly"}
                    </p>
                  )}
                </div>
                <Divider className="" />
                <div className="flex flex-row items-center px-10 my-4 text-sm">
                  <p className="w-[27rem]">Next invoice in</p>
                  {subscription?.nextInvoiceDate && (
                    <p>
                      {calculateDaysLeft(
                        subscription?.nextInvoiceDate.toDate()
                      )}
                    </p>
                  )}
                </div>
                <Divider className="" />
                <div className="flex flex-row items-center px-10 my-4 text-sm">
                  <p className="w-[27rem]">Next invoice</p>
                  {subscription?.nextInvoiceAmount !== undefined && (
                    <p>${subscription.nextInvoiceAmount.toFixed(2)}</p>
                  )}
                  {subscription?.accountBalance !== undefined && (
                    <p className="text-xs ml-6 text-foreground-500">
                      Account balance:{" "}
                      <span
                        className={`inline-block ${
                          subscription.accountBalance < 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {subscription.accountBalance < 0
                          ? `($${Math.abs(subscription.accountBalance).toFixed(
                              2
                            )})`
                          : `$${subscription.accountBalance.toFixed(2)}`}
                      </span>
                    </p>
                  )}
                </div>
                <Divider className="" />
                <div className="flex flex-row items-center px-10 my-4 text-sm">
                  <div className="flex flex-col">
                    <p className="w-[27rem]">Enable usage based billing</p>
                    <p className="text-xs text-foreground-500">
                      (Surpass 100 minutes for $0.8 per extra minute)
                    </p>
                  </div>
                  <Switch
                    isDisabled
                    aria-label="Usage based billing"
                    size="sm"
                  />
                </div>
              </>
            )}
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
                  subscription.status === "Cancelling" ? (
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
                {subscription.planID === "Basic Plan" &&
                  ((subscription.period === "Monthly" && selected === false) ||
                    (subscription.period === "Yearly" &&
                      selected === true)) && (
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
                  subscription.planID === "Business Plan" ||
                  (subscription.planID === "Basic Plan" &&
                    ((subscription.period === "Monthly" && selected === true) ||
                      (subscription.period === "Yearly" &&
                        selected === false)))) && (
                  <Button
                    color="default"
                    fullWidth
                    onPress={() => {
                      setSelectedPriceID(
                        selected
                          ? "price_1OvnitLgT8zvXr8nlvm3sPMN"
                          : "price_1OvniMLgT8zvXr8n5J04Pogc"
                      );
                      onOpenChangeSubscriptionModal();
                    }}
                  >
                    {subscription.planID === "Basic Plan" &&
                    ((subscription.period === "Monthly" && selected === true) ||
                      (subscription.period === "Yearly" && selected === false))
                      ? `Switch to ${selected ? "Yearly" : "Monthly"}`
                      : "Downgrade"}
                  </Button>
                )}
              </Card>
              <Card className="p-4 px-6 border border-indigo-700">
                <div className="flex flex-row justify-between items-center mb-2">
                  <h1 className="font-semibold text-xl">Creator</h1>
                  {subscription.planID === "Creator Plan" &&
                  subscription.status === "Cancelling" ? (
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
                {subscription.planID === "Creator Plan" &&
                  ((subscription.period === "Monthly" && selected === false) ||
                    (subscription.period === "Yearly" &&
                      selected === true)) && (
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
                {(subscription.planID === "Basic Plan" ||
                  subscription.planID === "Business Plan" ||
                  (subscription.planID === "Creator Plan" &&
                    ((subscription.period === "Monthly" && selected === true) ||
                      (subscription.period === "Yearly" &&
                        selected === false)))) && (
                  <Button
                    color="primary"
                    onPress={() => {
                      setSelectedPriceID(
                        selected
                          ? "price_1OwozkLgT8zvXr8nTFy6aNXM"
                          : "price_1OwozILgT8zvXr8n3iaevJTK"
                      );
                      onOpenChangeSubscriptionModal();
                    }}
                    fullWidth
                  >
                    {subscription.planID === "Creator Plan" &&
                    ((subscription.period === "Monthly" && selected === true) ||
                      (subscription.period === "Yearly" && selected === false))
                      ? `Switch to ${selected ? "Yearly" : "Monthly"}`
                      : `${
                          subscription.planID === "Basic Plan"
                            ? "Upgrade"
                            : "Downgrade"
                        }`}
                  </Button>
                )}
              </Card>
              <Card className="p-4 px-6">
                <div className="flex flex-row justify-between items-center mb-2">
                  <h1 className="font-semibold text-xl">Business</h1>
                  {subscription.planID === "Business Plan" &&
                  subscription.status === "Cancelling" ? (
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
                          ? "price_1OyclCLgT8zvXr8nnPbItN3V"
                          : "price_1OycklLgT8zvXr8n2utTNsqB"
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
                {subscription.planID === "Business Plan" &&
                  ((subscription.period === "Monthly" && selected === false) ||
                    (subscription.period === "Yearly" &&
                      selected === true)) && (
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
                {(subscription.planID === "Basic Plan" ||
                  subscription.planID === "Creator Plan" ||
                  (subscription.planID === "Business Plan" &&
                    ((subscription.period === "Monthly" && selected === true) ||
                      (subscription.period === "Yearly" &&
                        selected === false)))) && (
                  <Button
                    color="default"
                    onPress={() => {
                      setSelectedPriceID(
                        selected
                          ? "price_1OyclCLgT8zvXr8nnPbItN3V"
                          : "price_1OycklLgT8zvXr8n2utTNsqB"
                      );
                      onOpenChangeSubscriptionModal();
                    }}
                    fullWidth
                  >
                    {subscription.planID === "Business Plan" &&
                    ((subscription.period === "Monthly" && selected === true) ||
                      (subscription.period === "Yearly" && selected === false))
                      ? `Switch to ${selected ? "Yearly" : "Monthly"}`
                      : "Upgrade"}
                  </Button>
                )}
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
                  With Sqribe, you can translate from nearly any language to
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
        size="2xl"
        isDismissable={!loadingSubscription}
        hideCloseButton={loadingSubscription}
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
                <FaCircleInfo
                  size={20}
                  className="mr-6 text-foreground-400 shrink-0"
                />
                <p className="text-foreground-500 text-xs pr-8">
                  Please note, if you choose to cancel your subscription, it
                  will remain active until the end of the current billing
                  period. You will continue to have access until then, after
                  which your subscription will be terminated. No refunds will be
                  issued for unused time or minutes. For assistance, contact
                  support.
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6">
                <Button
                  color="default"
                  onPress={onCloseCancelSubscriptionModal}
                  className="mr-4"
                  isDisabled={loadingSubscription}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={cancelSubscription}
                  isLoading={loadingSubscription}
                >
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
        size="2xl"
        isDismissable={!loadingSubscription}
        hideCloseButton={loadingSubscription}
      >
        <ModalContent className="">
          {(onCloseStopCancelSubscriptionModal) => (
            <div className="flex flex-col p-6 text-foreground">
              <h2 className="text-lg mb-4">Resume Subscription</h2>
              <p className="text-foreground-500 text-sm mb-6">
                Do you really want to continue your subscription at the next
                billing interval?
              </p>
              <div className="bg-foreground-100 rounded-lg p-4 flex items-center">
                <FaCircleInfo
                  size={20}
                  className="mr-6 text-foreground-400 shrink-0"
                />
                <p className="text-foreground-500 text-xs pr-6">
                  Before resuming your subscription, be aware that charges will
                  apply based on your chosen plan and billing interval. If you
                  previously canceled, your subscription will resume at the
                  start of the next billing interval. Reach out to support for
                  assistance.
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6">
                <Button
                  color="default"
                  onPress={onCloseStopCancelSubscriptionModal}
                  className="mr-4"
                  isDisabled={loadingSubscription}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={stopCancelSubscription}
                  isLoading={loadingSubscription}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenChangeSubscriptionModal}
        onOpenChange={onOpenChangeChangeSubscriptionModal}
        className={`${isDarkMode ? "dark" : "light"}`}
        size="2xl"
        isDismissable={!loadingSubscription}
        hideCloseButton={loadingSubscription}
      >
        <ModalContent className="">
          {(onCloseChangeSubscriptionModal) => (
            <div className="flex flex-col p-6 text-foreground">
              <h2 className="text-lg mb-2">Update Subscription</h2>
              <p className="text-foreground-500 text-sm mb-2">
                You are changing your subscription plan to:
              </p>
              {selectedPriceID === "price_1OvniMLgT8zvXr8n5J04Pogc" ? (
                <div>
                  <p className="text-foreground font-medium">
                    Basic Plan - Monthly
                  </p>
                  <div className="flex flex-row items-center mb-3 text-sm">
                    <p className="text-foreground">$30 / month</p>
                    <p className="ml-4 italic">(billed monthly at $30)</p>
                  </div>
                </div>
              ) : selectedPriceID === "price_1OvnitLgT8zvXr8nlvm3sPMN" ? (
                <div>
                  <p className="text-foreground font-medium">
                    Basic Plan - Yearly
                  </p>
                  <div className="flex flex-row items-center mb-3 text-sm">
                    <p className="text-foreground">$25 / month</p>
                    <p className="ml-4 italic">(billed annually at $300)</p>
                  </div>
                </div>
              ) : selectedPriceID === "price_1OwozkLgT8zvXr8nTFy6aNXM" ? (
                <div>
                  <p className="text-foreground font-medium">
                    Creator Plan - Yearly
                  </p>
                  <div className="flex flex-row items-center mb-3 text-sm">
                    <p className="text-foreground">$60 / month</p>
                    <p className="ml-4 italic">(billed annually at $720)</p>
                  </div>
                </div>
              ) : selectedPriceID === "price_1OwozILgT8zvXr8n3iaevJTK" ? (
                <div>
                  <p className="text-foreground font-medium">
                    Creator Plan - Monthly
                  </p>
                  <div className="flex flex-row items-center mb-3 text-sm">
                    <p className="text-foreground">$75 / month</p>
                    <p className="ml-4 italic">(billed monthly at $75)</p>
                  </div>
                </div>
              ) : selectedPriceID === "price_1OyclCLgT8zvXr8nnPbItN3V" ? (
                <div>
                  <p className="text-foreground font-medium">
                    Business Plan - Yearly
                  </p>
                  <div className="flex flex-row items-center mb-3 text-sm">
                    <p className="text-foreground">$250 / month</p>
                    <p className="ml-4 italic">(billed annually at $3000)</p>
                  </div>
                </div>
              ) : selectedPriceID === "price_1OycklLgT8zvXr8n2utTNsqB" ? (
                <div>
                  <p className="text-foreground font-medium">
                    Business Plan - Monthly
                  </p>
                  <div className="flex flex-row items-center mb-3 text-sm">
                    <p className="text-foreground">$300 / month</p>
                    <p className="ml-4 italic">(billed monthly at $300)</p>
                  </div>
                </div>
              ) : (
                <p className="text-foreground-500 text-sm">Unknown Plan</p>
              )}
              <div className="bg-foreground-100 rounded-lg p-4 flex items-center">
                <FaCircleInfo
                  size={20}
                  className="mr-6 text-foreground-400 shrink-0"
                />
                <p className="text-foreground-500 text-xs pr-6">
                  Please note that changing your subscription plan or billing
                  period may result in proration adjustments. This means that
                  you will only be charged for the portion of the plan you use,
                  and any changes will be reflected in your next invoice. You
                  will only be charged if there are additional costs incurred
                  due to changes in your subscription. If you have any questions
                  or concerns about how this may affect your billing, please
                  don&apos;t hesitate to contact our support team for
                  assistance. <br />
                  <br />
                  Do you wish to proceed with the changes to your subscription?
                </p>
              </div>
              <div className="flex flex-row justify-end mt-6">
                <Button
                  color="default"
                  onPress={onCloseChangeSubscriptionModal}
                  className="mr-4"
                  isDisabled={loadingSubscription}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={loadingSubscription}
                  onPress={async () => {
                    setLoadingSubscription(true);
                    await changeSubscription({
                      newPriceId: selectedPriceID,
                    });
                    setLoadingSubscription(false);
                    onCloseChangeSubscriptionModal();
                  }}
                >
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
