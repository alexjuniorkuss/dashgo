import { Box, Button, Stack } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

export function Pagination() {
    return (
        <Stack
            direction={["column","row"]}
            mt="8"
            justify="space-between"
            spacing="6"
            align="center"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">
                <PaginationItem numberOfPage={1} isCurrent />
                <PaginationItem numberOfPage={2} />
                <PaginationItem numberOfPage={3} />
                <PaginationItem numberOfPage={4} />
                <PaginationItem numberOfPage={5} />
                <PaginationItem numberOfPage={6} />
            </Stack>
        </Stack>
    );
}