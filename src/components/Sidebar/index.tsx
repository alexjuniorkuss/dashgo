import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";

import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext"

import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
    const { isOpen, onClose } = useSidebarDrawer()

    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false,
    })

    if (isDrawerSidebar) { //placemente o lado do menu
        return(
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} > 
            <DrawerOverlay>  {/* deixa a tela mais escura com foco no menu   */}
                <DrawerContent bg="gray.800" p="4" >
                    <DrawerCloseButton mt="6" />
                    <DrawerHeader>Navegação</DrawerHeader>
                    <DrawerBody>
                        <SidebarNav />
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer> 
        );
    }
    
    return (
        <Box as="aside" w="64" mr="8">
            <SidebarNav />
        </Box>
    );
}