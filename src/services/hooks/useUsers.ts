import { useQuery } from 'react-query';
import { api } from '../api';

type User = {
    id:string;
    name: string;
    email:string;
    createdAt:string;
}

type GetUsersResponse = {
    totalCount: number;
    users: User[];

}
export async function getUsers(page: number) : Promise<GetUsersResponse>{
        // COM FETCH
        // const response = await  fetch('http://localhost:3000/api/users')
        //const data = await response.json()

        //COM AXIOS
        const {data , headers} = await api.get('users',{
            params:{
                page
            }
        })

        const totalCount = Number(headers['x-total-count'])

        const users = data.users.map(user => {
            return{
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt : new Date().toLocaleDateString('pt-BR',{
                        day: '2-digit',
                        month:'long',
                        year:'numeric'
                    })
                // createdAt : new Date(user.createdAt).toLocaleDateString('pt-BR',{
                //     day: '2-digit',
                //     month:'long',
                //     year:'numeric'
                // })
            };
        });

        return { users, totalCount };
}

export function useUser(page: number){
    return useQuery(['users',page], () => getUsers(page),{    //criar a chave exige o nome para salvar no cache onde irar salvar, e o método
        staleTime:1000*10, // 5 sec
    } ) 
}

//Nesse arquivo desaclopamos a função que busca os usuarios do react-query, 
// ou seja podemos obter os usuarios sem necessitar de chamala por meio do react-query