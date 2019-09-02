const jsonMetadataKey = "jsonProperty";
import 'reflect-metadata';

export interface IJsonMetaData<T> {
    name?: string,
    clazz?: { new (): T },
    dictionary?: boolean
}
export function JsonProperty<T>(metadata?: IJsonMetaData<T> | string): any {
    if (metadata instanceof String || typeof metadata === "string") {
        return Reflect.metadata(jsonMetadataKey, {
            name: metadata,
            clazz: undefined,
            dictionary: false
        });
    } else {
        let metadataObj = <IJsonMetaData<T>>metadata;
        return Reflect.metadata(jsonMetadataKey, {
            name: metadataObj ? metadataObj.name : undefined,
            clazz: metadataObj ? metadataObj.clazz : undefined,
            dictionary: metadataObj ? metadataObj.dictionary : false
        });
    }
}

export function getClazz(target: any, propertyKey: string): any {
    return Reflect.getMetadata("design:type", target, propertyKey)
}
export function getJsonProperty<T>(target: any, propertyKey: string): IJsonMetaData<T> {
    return Reflect.getMetadata(jsonMetadataKey, target, propertyKey);
}

export class MapUtils {
    static isPrimitive(obj) {
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
                return true;
        }
        return !!(obj instanceof String || obj === String ||
            obj instanceof Number || obj === Number ||
            obj instanceof Boolean || obj === Boolean);
    }

    static isArray(object) {
        if (object === Array) {
            return true;
        } else if (typeof Array.isArray === "function") {
            return Array.isArray(object);
        }
        else {
            return !!(object instanceof Array);
        }
    }

    static log(indent, msg) {
        //console.log(indent + msg);
    }

    static deserialize<T>(clazz: { new (): T }, jsonObject) {
        if (MapUtils.isArray(jsonObject)) {
            MapUtils.log('', "Top-level object is an array... assuming it's an array of objects");
            return jsonObject.map((item) => MapUtils.deserializeIndent(clazz, item, ''));
        }
        return MapUtils.deserializeIndent(clazz, jsonObject, '');
    }

    static deserializeIndent<T>(clazz: { new (): T }, jsonObject, indent) {
        if ((clazz === undefined) || (jsonObject === undefined)) return undefined;
        let obj = new clazz();
        Object.keys(obj).forEach((key) => {
            MapUtils.log(indent, 'deserializing ' + key);
            let propertyMetadataFn: (IJsonMetaData) => any = (propertyMetadata) => {
                let propertyName = propertyMetadata.name || key;
                //MapUtils.log(indent, 'jsonObject -- ' + JSON.stringify(jsonObject));
                let innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                let clazz = getClazz(obj, key);
                let metadata = getJsonProperty(obj, key);
                if (MapUtils.isArray(clazz)) {
                    MapUtils.log(indent, 'isArray -- ' + JSON.stringify(metadata));
                    if (metadata.clazz || MapUtils.isPrimitive(clazz)) {
                        MapUtils.log(indent, 'array is either primitive or of class');
                        //MapUtils.log(indent, 'innerJson - ' + JSON.stringify(innerJson));
                        if (innerJson && MapUtils.isArray(innerJson)) {
                            MapUtils.log(indent, 'Array contains objects!');
                            return innerJson.map(
                                (item) => MapUtils.deserializeIndent(metadata.clazz, item, indent + '  ')
                            );
                        } else {
                            MapUtils.log(indent, 'undefined');
                            return undefined;
                        }
                    } else {
                        MapUtils.log(indent, 'innerJson - ' + JSON.stringify(innerJson));
                        return innerJson;
                    }

                } else if (metadata.dictionary && metadata.dictionary === true) {
                    MapUtils.log(indent, 'isDictionary');
                    return MapUtils.deserializeDictionary(metadata.clazz, innerJson, indent + '  ');
                } else if (!MapUtils.isPrimitive(clazz)) {
                    MapUtils.log(indent, 'isPrimitive');
                    return MapUtils.deserialize(clazz, innerJson);
                } else {
                    MapUtils.log(indent, 'unknown -- jsonObject: ' + JSON.stringify((jsonObject ? jsonObject[propertyName] : undefined)));
                    return jsonObject ? jsonObject[propertyName] : undefined;
                }
            };

            let propertyMetadata = getJsonProperty(obj, key);
            if (propertyMetadata) {
                MapUtils.log(indent, 'found property metadata');
                obj[key] = propertyMetadataFn(propertyMetadata);
            } else {
                MapUtils.log(indent, 'no property metadata');
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });
        return obj;
    }

    static deserializeDictionary<T>(clazz: { new (): T }, jsonObject, indent) {
        MapUtils.log(indent, 'deserializing dictionary: ' + JSON.stringify(jsonObject));
        if (jsonObject === undefined) return undefined;
        let obj = {};
        Object.keys(jsonObject).forEach((key) => {
            if (clazz === undefined) {
                MapUtils.log(indent, 'clazz undefined');
                obj[key] = jsonObject[key];
            } else {
                MapUtils.log(indent, 'clazz is defined');
                obj[key] = MapUtils.deserializeIndent(clazz, jsonObject[key], indent + '  ');
            }
        });
        return obj;
    }
}
