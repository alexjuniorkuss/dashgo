import {createServer,Factory, Model,Response,ActiveModelSerializer} from 'miragejs'

type User={
    name: string;
    email: string;
    created_at: string;
};

export function makeServer(){
     const server = createServer({
        
        serializers: {
            application: ActiveModelSerializer,
        },

        models:{
            user: Model.extend<Partial<User>>({})    //modelo usuarios do tipo User podendo conter parcialmente as mesmas variaveis.
        },

        factories:{ //conceito para gerar dados em massa
            user: Factory.extend({
                name(i: number){
                    return `User ${i+1}`
                },
                email(i: number){
                    return `User${i}@yata.dev`
                },
                createdAt(){
                    return new Date()
                },

            })
        },
        
        seeds(server){ //criar dados assim que servidor for iniciado
            server.createList('user',12);
        },

        routes(){
            this.namespace= 'api';
            this.timing= 750; //delay para tentar tratar casos de tempo de resposta....

            this.get('/users', function(schema, request){
                const {page = 1 , per_page = 10} = request.queryParams

                const total= schema.all('user').length

                const pageStart =(Number(page)-1) * Number(per_page);
                const pageEnd= pageStart + Number(per_page);

                const users = this.serialize(schema.all('user'))
                .users
                .sort((a: User, b: User) => (
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                     ))
                .slice(pageStart, pageEnd)

                return new Response(
                    200,
                    {'x-total-count': String(total)},
                    {users}
                );
            }); //mirage busca os dados de usuarios automatico
            
            this.get('/users/:id');
            this.post('/users', function (schema, request){
                console.warn(JSON.parse(request.requestBody));
                return null
            });  //envia usuarios automaticamente no banco de da dos
            

            this.namespace='';
            this.passthrough()   //todas as chamadas para endereço api passem pelo mirage, caso não sejam detectadas pelas rotas do mirage, elas passam adiante para rotas original delas, ou pagina e função disponivel..
        }
     })

     return server;
}