import { Box, Button, Divider, Flex, Heading, HStack, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { RiSave3Line } from "react-icons/ri";
import { SubmitHandler, useForm } from 'react-hook-form'
import *as yup from 'yup'
import Link from "next/link";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { yupResolver } from "@hookform/resolvers/yup";

type CreateUsersFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
})

export default function CreateUser() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const { errors } = formState

    const handleCreateUser: SubmitHandler<CreateUsersFormData> = async (values) => {
        console.log(values);
    }

    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="name"
                                label="Nome Completo"
                                placeHold="Digite aqui seu nome..."
                                error={errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                placeHold="Digite aqui seu E-mail..."
                                error={errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Senha"
                                placeHold="Digite aqui sua senha..."
                                error={errors.password}
                                {...register('password')}
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da Senha"
                                placeHold="Confirme aqui sua senha..."
                                error={errors.password_confirmation}
                                {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end" >
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button
                                type="submit"
                                leftIcon={<Icon as={RiSave3Line} />}
                                colorScheme="pink"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}