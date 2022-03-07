import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import("react-apexcharts"),{
    ssr: false,
}) 

const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime' as const,
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            "2018-08-01T15:16:34.791Z",
            "2018-08-02T15:16:34.791Z",
            "2018-08-03T15:16:34.791Z",
            "2018-08-04T15:16:34.791Z",
            "2018-08-05T15:16:34.791Z",
            "2018-08-06T15:16:34.791Z",
            "2018-08-07T15:16:34.791Z",
        ],
    },
};

const series = [
    {
        name: 'Series1',
        data: [31, 120, 10, 28, 61, 18, 109]
    }
];

export default function Dashboard() {
    return (
      <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />
  
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            <Box p={["4", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Inscritos da semana
              </Text>
              <Chart options={options} series={series} type="area" height={160} />
            </Box>
  
            <Box p={["4", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Taxa de Abertura
              </Text>
              <Chart options={options} series={series} type="area" height={160} />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    );
  }