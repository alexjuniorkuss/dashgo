import {Header} from '../components/Header/header';
import {Flex, SimpleGrid, Box, Text,theme} from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar';
import {Props} from 'react-apexcharts'
import dynamic from 'next/dynamic';

const Chart = dynamic(()=> import('react-apexcharts'), {
    ssr:false,
})

//configuração apexcharts
const options: Props ={
    chart:{
        toolbar:{
            show:false,
        },
        zoom:{
            enabled:false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid:{
        show:false,
    },
    dataLabels:{
        enabled: false,
    },
    tooltip:{
        enabled:false,
    },
    xaxis:{
        type:'datetime',
        axisBorder:{
            color:theme.colors.gray[600]
        },
        axisTicks:{
            color:theme.colors.gray[600]
        },
        categories:[
            '2021-03-18T00:00:00.000Z',
            '2021-03-19T00:00:00.000Z',
            '2021-03-20T00:00:00.000Z',
            '2021-03-21T00:00:00.000Z',
            '2021-03-22T00:00:00.000Z',
            '2021-03-23T00:00:00.000Z',
            '2021-03-24T00:00:00.000Z',
        ],
    },
    fill:{
        opacity: 0.3,
        type:'gradient',
        gradient:{
            shade:'dark',
            opacityFrom:0.7,
            opacityTo:0.3,
        },
    },
};

const series = [
    {name:'series1',data:[31,120,10,28,61,18,109]}
];


export default function DashBoard (){


    return(
        <Flex direction="column" h="100vh" w="100vw">
            <Header/>
 
            <Flex 
                w={["100%","100%"]}
                h={["auto","auto"]}
                my="6" 
                maxWidth={1200}
                mx={["4","auto"]} 
                px={["4","6"]}
            >
                <Sidebar/>

                <SimpleGrid flex="1" gap="4" minChildWidth={["320px","320px","320px"]} align="flex-start" m={["8","8","0"]}>
                    <Box p={["4","8"]}  bg="gray.800" borderRadius={8} pb="4">
                        <Text fontSize={["2xl","2xl","lg"]} mb="4">Inscritos da Semana</Text>
                    <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                    <Box p={["4","8"]}  bg="gray.800" borderRadius={8}>
                        <Text fontSize={["2xl","2xl","lg"]} mb="4">Taxa de abertura</Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    );
}