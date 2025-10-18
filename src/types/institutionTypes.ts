export interface Institution {
    name : string,
    type : InstitutionType,
    address : string
}

enum InstitutionType{
    HOSPITAL="HOSPITAL",
    CLINIC="CLINIC"
}