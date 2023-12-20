import AppShell from "@/components/AppShell";
import withAuth from "@/components/withAuth";
import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Avatar,
} from "@nextui-org/react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { IoSparkles } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { useRouter } from "next/router";
ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomValues = (count) => {
  const values = [];
  for (let i = 0; i < count; i++) {
    values.push(Math.floor(Math.random() * 100));
  }
  return values;
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Dashboard = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user.data);

  const data = {
    labels: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
    datasets: [
      {
        data: generateRandomValues(5),
        backgroundColor: [
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
        ],
        borderColor: Array(5).fill("transparent"),
      },
    ],
  };

  const data2 = {
    labels: [
      "Category 1",
      "Category 2",
      "Category 3",
      "Category 4",
      "Category 5",
    ],
    datasets: [
      {
        data: generateRandomValues(5),
        backgroundColor: [
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
          getRandomColor(),
        ],
        borderColor: Array(5).fill("transparent"),
      },
    ],
  };

  const options = {
    cutout: "60%", // Adjust the cutout percentage for a solid doughnut
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <AppShell>
      <div className="flex flex-col items-center pb-24 pt-10 w-full text-foreground max-w-7xl mx-auto">
        <div className="flex w-full gap-4">
          <div className="w-2/3 space-y-2">
            <h1 className="text-2xl mb-4">Recent Projects</h1>
            <Card className="p-4 w-full">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-md">Drake Snippet</p>
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
                <Spinner />
              </div>
            </Card>
            <Card className="p-4 w-full">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <p className="text-md">Drake Snippet</p>
                  <p className="text-small text-default-500">nextui.org</p>
                </div>
                <Spinner />
              </div>
            </Card>
          </div>
          <div className="w-1/3">
            <h1 className="text-2xl mb-[18px]">New Features</h1>
            <Button
              onPress={() => router.push("/makespeech")}
              className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-full h-unit-18 mb-3 text-lg text-white"
            >
              <IoSparkles />
              AI Text To Speech
            </Button>
            <Button className="bg-gradient-to-r from-blue-400 to-emerald-400 w-full h-unit-18 mb-2 text-lg text-white">
              <IoSparkles />
              AI Thumbnail Generator
            </Button>
          </div>
        </div>
        <div className="flex flex-col mt-4 w-full">
          <h1 className="text-2xl mb-4">All Projects</h1>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>PROJECT NAME</TableColumn>
              <TableColumn>DATE CREATED</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Drake Snippet</TableCell>
                <TableCell>12/19/2023</TableCell>
                <TableCell>
                  <Chip color="primary">Ready</Chip>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Pipe Down</TableCell>
                <TableCell>12/19/2023</TableCell>
                <TableCell>
                  <Chip color="warning">Processing</Chip>
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>long speech</TableCell>
                <TableCell>12/19/2023</TableCell>
                <TableCell>
                  <Chip color="primary">Ready</Chip>
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>ongah</TableCell>
                <TableCell>12/19/2023</TableCell>
                <TableCell>
                  <Chip color="primary">Ready</Chip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col mt-8 w-full">
          <div className="flex gap-4">
            <Card className="p-4 w-full flex items-center">
              <p className="text-2xl mb-6 mt-2">Usage Statistics</p>
              <div className="w-44 h-44 mb-3">
                <Doughnut data={data} options={options} />
              </div>
            </Card>
            <Card className="p-4 w-full flex items-center justify-around">
              <p className="">Current Plan:</p>
              <p className="text-2xl font-bold">Standard Plan</p>
              <p className="text-xl font-semibold">$10 / month</p>
              <Button color="danger" size="lg">
                Upgrade
              </Button>
              <p>Next Billing Cycle:</p>
              <p className="font-semibold">December 28</p>
            </Card>
            <Card className="p-4 w-full flex items-center">
              <p className="text-2xl mb-6 mt-2">Billing Cycle</p>
              <div className="w-44 h-44">
                <Doughnut data={data2} options={options} />
              </div>
            </Card>
          </div>
        </div>
        <div className="flex w-full mt-8 gap-4">
          <div className="w-[25%]">
            <Card className="p-4 w-full h-full">
              <h1 className="text-2xl mb-4">User Profile</h1>
              <div className="flex items-center">
                <Avatar size="lg" />
                <p className="text-lg ml-3">{userData?.email}</p>
              </div>
            </Card>
          </div>
          <div className="w-[12.5%]">
            <Button className="h-full w-full px-0 rounded-2xl">
              <Card className="p-4 w-full flex items-center justify-center">
                <h1 className="text-xl mb-3">Settings</h1>
                <IoMdSettings className="w-16 h-16 mb-3" />
              </Card>
            </Button>
          </div>
          <div className="w-[62.5%]">
            <div className="w-full h-full space-y-2 flex flex-col justify-around">
              <Card className="px-4 py-2 rounded-lg text-center">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 text-lg font-medium">
                  Enhance Videos with AI Captions
                </p>
              </Card>
              <Card className="px-4 py-2 rounded-lg text-center">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 text-lg font-medium">
                  Multilingual Voice Overs in Seconds
                </p>
              </Card>
              <Card className="px-4 py-2 rounded-lg text-center">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 text-lg font-medium">
                  Streamline Dubbing Across Languages
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default withAuth(Dashboard);
