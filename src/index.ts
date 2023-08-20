import { NewLable } from "./model/class";
import { AppDataSource } from "./data-source";
import { Entities } from "./model/entity/Entities";
import { IEntitiesTypeAndID } from "./types";

const entityTypeAndId: IEntitiesTypeAndID = {
    Company: <any>{},
    Site: <any>{},
    User: <any>{}
}

//  Пример использования класса
const example = async () => {
    try {
        await NewLable.connect(); // подключаем базу данных

        const rep = await AppDataSource.manager.getRepository(Entities).find();

        rep.forEach((element) => { // получаем из базы данных типы сущности и их идентификаторы, записываем их в объект entityTypeAndId
            entityTypeAndId[element.type] = element;
        });

        await NewLable.create(entityTypeAndId.Company.type, entityTypeAndId.Company.id, ['Lable1, Lable2, Lable3']) // добавляем три лейбла в сущность Company с идентификатором 1
        
        console.log('Lables were created: ');
        const lables = await NewLable.get(entityTypeAndId.Company.type, entityTypeAndId.Company.id); // получаем лейблы из сущности с типом Компания и id 1
        console.log(lables);

        if (lables instanceof Error) { // если вернуло ошибу - прокидываем ее
            throw new Error(lables.message);
        }
    
        await NewLable.update(entityTypeAndId.Company.type, entityTypeAndId.Company.id, ['Lable10']) // обновляем лейблы из сущности Компания с идентификатором 1 - 3 прошлых лейбла заменятся на Lable 10

        console.log('Lables were updated: ')
        const updateLables = await NewLable.get(entityTypeAndId.Company.type, entityTypeAndId.Company.id); // проверяем
        console.log(updateLables);

        if (updateLables instanceof Error) { // если вернуло ошибу - прокидываем ее
            throw new Error(updateLables.message);
        }

        await NewLable.delete(entityTypeAndId.Company.type, entityTypeAndId.Company.id, updateLables); // удаляем обновленный лейбл

        console.log('Lables were deleted: ')
        const deletedLables = await NewLable.get(entityTypeAndId.Company.type, entityTypeAndId.Company.id); // проверяем
        console.log(deletedLables);

    } catch (error) {
        
    }
}

example();

