export class Book{  

    constructor(
        
        title: string,
        price: number,
        nbpage: number,
        publisher?: Publisher,
        authors?: Array<Author>,
        id?: number
      ) {  }
}

export class Publisher{
    id: number;
    name: string
}

export class Author{
    id: number;
    name: string
}