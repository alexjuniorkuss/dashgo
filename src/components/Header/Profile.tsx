import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile( { showProfileData} : ProfileProps) {
    return (
        <Flex align="center" >
           { showProfileData && (
               <Box mr="4" textAlign="right">
               <Text>Alex Junior</Text>
               <Text color="gray.300" fontSize="small">
                   alexcontas2018@gmail.com
               </Text>
           </Box>
           )} 
            <Avatar size="md" name="Alex Junior Kuss" src="https://github.com/alexjuniorkuss.png" />
        </Flex>
    );
}