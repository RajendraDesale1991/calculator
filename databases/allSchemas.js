import Realm from 'realm';

export const Calc_SCHEMA = 'Calc';

// define schema
export const CalcSchema = {
    name: Calc_SCHEMA,
    primaryKey :  'id',
    properties:{
        id: 'int', // primary key
        calctext: { type: 'string'},
        resulttext:{ type: 'string'},
    }
};

const databaseOptions = {
    path: 'calc.realm',
    schema: [CalcSchema],
    schemaVersion:0, // optional
};

// function for calc
export const insertCalcData = newCalc => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(Calc_SCHEMA, newCalc);
            resolve(newCalc);
        });      
    }).catch((error) => reject(error));
});

export const deleteCalc = calcID => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingCalc = realm.objectForPrimaryKey(Calc_SCHEMA, calcID);
            realm.delete(deletingCalc);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const deleteAllCalc = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allCalc = realm.objects(Calc_SCHEMA);
            realm.delete(allCalc);
            resolve();
        });
    }).catch((error) => reject(error));
});

export const queryAllCalc = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allCalc = realm.objects(Calc_SCHEMA);
            resolve(allCalc);
        });
    }).catch((error) => reject(error));
});

export default new Realm(databaseOptions);
