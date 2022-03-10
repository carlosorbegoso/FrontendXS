import { Cargo } from "./cargo";
import { Ubigeo } from "./ubigeo";

export class Trabajador {
    constructor(){}
	trabId?: number;
	trabCodigo?: string ;
	trabFechaRegistro?;
	trabFechaNacimiento?: string;
	trabApellidoPaterno?: string;
	trabApellidoMaterno?: string;
	trabNombre?: string;
	trabTipoDoc?: string;
	trabNroDoc?: string;
	trabDireccion?: string;
	trabSexo?: string;
	trabEstadoCivil?: string;
	trabEmail?: string;
	trabFoto?: string;
	trabTelf?:string;
	trabObservacion?: string;
	userRegistro?: string;
	trabEstado?: string;
	cargo?:Cargo;
	ubigeo?:Ubigeo;
}
