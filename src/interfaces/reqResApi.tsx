export interface Credencials {
    UserAccount: string,
    Password: string
}

export interface LoginInterfaceFail {
    $id:     string;
    Message: string;
}

export interface LoginInterface {
    $id:     string;
    Data:    Data;
    Type:    string;
    Message: string;
}

export interface Data {
    $id:     string;
    Token:   string;
    Usuario: Usuario;
    Empresa: string;
    Nombre:  string;
    Accesos: null;
}

export interface Usuario {
    $id:       string;
    IdUsuario: string;
    Pin:       null;
}
