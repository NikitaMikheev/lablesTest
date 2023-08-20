import { connectBD } from "../connectBD";
import { AppDataSource } from "../data-source";
import { Lables } from "./entity/Lables";
import { Entities } from "./entity/Entities";

class WorkWithLables {

    async create(type: string, id: number, lableList: string[]): Promise<string | Error> { // создание лейблов
        try {
            if (lableList.length === 0) { // если лейблы не переданы - возвращается ошибка
                throw new Error('Array is empty!')
            }

            const lablesArray: Lables[] = [];

            const entity = await AppDataSource.manager.getRepository(Entities).findOne({
                where: {
                    id: id,
                    type: type
                }
            });
            
            if (!entity) { // если не найдены сущности - возвращается ошибка
                throw new Error('The entity is not defind! Check type or id')
            }

            for (const elem of lableList) { // обходим массив лейблов, создаем новые экземпляры и связи
                const newLable = new Lables();
                newLable.text = elem;
                newLable.entities = [entity];
                lablesArray.push(structuredClone(newLable));
            }

            await AppDataSource.manager.save(Lables, lablesArray);

            return 'Created';
        } catch (error) {
            console.log(error);
            return error;
        }
        
    }

    async get(type: string, id: number): Promise<Lables[] | Error> { // получение лейблов
        try {
            const lables = await AppDataSource.manager.getRepository(Lables).find({ // получаем все лейблы по id и типу сущности
                where: {
                    entities: {
                        id: id,
                        type: type
                    }
                }
            });

            return lables;
            
        } catch (error) {
            console.log(error);
            return error;
        }

    }

    async update(type: string, id: number, lableList: string[]): Promise<string | Error> { // обновление лейблов
        try {
            let entity = await AppDataSource.manager.getRepository(Lables).find({
                where: {
                    entities: {
                        id: id,
                        type: type
                    }
                },
                relations: {
                    entities: true
                }
            });
            
            if (!entity) { // если не найдены сущности - возвращается ошибка
                throw new Error('The entity is not defind! Check type or id')
            }

            entity = entity.filter((elem) => { // вычищаем из сущности все старые лейблы
                return elem.entities = [];
            });

            await AppDataSource.manager.save(Lables, entity);

            if (lableList.length === 0) { // если пустой массив лейблов -> вычищаем старые лейблы и не добавляем новые
                return 'Updated';
            }

            const res = this.create(type, id, lableList); // вызываем метод создания
            return res;

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async delete(type: string, id: number, lableList: Lables[]): Promise<string | Error> { // удаление лейблов
        try {
            if ((await lableList).length === 0) { // если лейблы не переданы - возвращается ошибка
                throw new Error('LableList is empty!');
            }
            let entity = await AppDataSource.manager.getRepository(Lables).find({
                where: {
                    entities: {
                        id: id,
                        type: type
                    }
                },
                relations: {
                    entities: true
                }
            });

            let lengthRemoveEntity = 0;
            entity = entity.filter((elem) => { // вычищаем старые связи
                if (!lableList.includes(elem)) {
                    lengthRemoveEntity++;
                    return elem.entities = []
                }
                return elem;
            });
            
            
            if(lengthRemoveEntity !== lableList.length) { // проверяем вычищены ли все переданные лейблы, если каких-то лейблов нет - возвращает ошибку 
                throw new Error('Some lables didnt find!');
            }

            await AppDataSource.manager.save(Lables, entity);
            
            return 'Deleted';
            
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    async connect(){ // метод подключения к базе данных
        try {
            await connectBD();
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export const NewLable = new WorkWithLables(); // эспортируем экземпляр класса