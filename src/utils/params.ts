export class Params {
  static required(object: any, fields: string[]) : undefined | string[] {
    const invalidFields: string[] = []
    fields.forEach(value => {      
      if (object[value] == undefined || object[value] == null) invalidFields.push(value)
    })
    if (invalidFields.length > 0) return invalidFields;
  }
}