import { Button } from "@chakra-ui/react";

interface PaginationItemProps{
    numberOfPage: number;
    isCurrent?: boolean;
}

export function PaginationItem({ isCurrent = false ,numberOfPage } : PaginationItemProps) { // =false um valor default
    if (isCurrent) {
        return (
            <Button
                size="sm"
                fontSize="xs"
                width="4"
                colorScheme="pink"
                disabled
                _disabled={{
                    bg: 'pink.500',
                    cursor: 'default'
                }}
            >
                {numberOfPage}
            </Button>
        );
    }
    return(
        <Button
                    size="sm"
                    fontSize="xs"
                    width="4"
                    bg="gray.700"
                    _hover={{
                        bg: 'gray.500'
                    }}
                    _disabled={{
                        bg: 'pink.500',
                        cursor: 'default'
                    }}
                >
                    {numberOfPage}
                </Button>
    );
}