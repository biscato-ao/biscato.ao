import React, { useState } from 'react';
import './style.scss'

interface InputForm {
  title: string
  type: string,
  placeholder: string,
  icon: any,
  value: any,
  onChange: any,
  rows: number
}

interface SelectLocation {
  selectedMunicipio: any;
  selectedProvincia: any;
}

interface Provincia {
  nome: any;
  municipios: any[];
}
const provincias: Provincia[] = [
  {
    nome: 'Bengo',
    municipios: ['Ambriz', 'Bula Atumba', 'Dande', 'Dembos', 'Nambuangongo', 'Pango Aluquém'],
  },
  {
    nome: 'Benguela',
    municipios: ['Baía Farta', 'Balombo', 'Benguela', 'Bocoio', 'Caimbambo', 'Catumbela', 'Chongoroi', 'Cubal', 'Ganda', 'Lobito'],
  },
  {
    nome: 'Bié',
    municipios: ['Andulo', 'Bailundo', 'Camacupa', 'Catabola', 'Chinguar', 'Chitembo', 'Cuemba', 'Cunhinga', 'Cuito', 'Nharea', 'Nhârea'],
  },
  {
    nome: 'Cabinda',
    municipios: ['Belize', 'Buco-Zau', 'Cabinda', 'Cacongo'],
  },
  {
    nome: 'Cuando Cubango',
    municipios: ['Calai', 'Cuangar', 'Cuchi', 'Cuito Cuanavale', 'Dirico', 'Longa', 'Mavinga', 'Menongue', 'Nancova', 'Rivungo'],
  },
  {
    nome: 'Cuanza Norte',
    municipios: ['Ambaca', 'Bolongongo', 'Cambambe', 'Cazengo', 'Golungo Alto', 'Gonguembo', 'Lucala', 'Quiculungo', 'Samba Cajú'],
  },
  {
    nome: 'Cuanza Sul',
    municipios: ['Amboim', 'Cela', 'Conda', 'Ebo', 'Libolo', 'Mussende', 'Porto Amboim', 'Quibala', 'Quilenda', 'Seles'],
  },
  {
    nome: 'Cunene',
    municipios: ['Cahama', 'Curoca', 'Cuanhama', 'Cuvelai', 'Namacunde', 'Ombadja'],
  },
  {
    nome: 'Huambo',
    municipios: ['Bailundo', 'Cachiungo', 'Caála', 'Chicala-Cholohanga', 'Chinhama', 'Ecunha', 'Huambo', 'Londuimbali', 'Longonjo', 'Mungo', 'Tchicala-Tcholohanga', 'Ukuma'],
  },
  {
    nome: 'Huíla',
    municipios: ['Caconda', 'Cacula', 'Caluquembe', 'Chibia', 'Chicomba', 'Chipindo', 'Cuvango', 'Gambos', 'Humpata', 'Jamba', 'Lubango', 'Matala', 'Quilengues'],
  },
  {
    nome: 'Luanda',
    municipios: ['Belas', 'Cacuaco', 'Cazenga', 'Icolo e Bengo', 'Quiçama', 'Luanda', 'Talatona', 'Viana'],
  },
  {
    nome: 'Lunda Norte',
    municipios: ['Cambulo', 'Capenda Camulemba', 'Caungula', 'Chitato', 'Cuango', 'Cuílo', 'Lubalo', 'Lucapa', 'Xá-Muteba'],
  },
  {
    nome: 'Lunda Sul',
    municipios: ['Cacolo', 'Dala', 'Muconda', 'Saurimo'],
  },
  {
    nome: 'Malanje',
    municipios: ['Calandula', 'Cambundi-Catembo', 'Cangandala', 'Caombo', 'Cunda-Dia-Baze', 'Luquembo', 'Malanje', 'Marimba', 'Massango', 'Mucari', 'Quela'],
  },
  {
    nome: 'Moxico',
    municipios: ['Alto Zambeze', 'Bundas', 'Cameia', 'Camanongue', 'Léua', 'Luacano', 'Luau', 'Luchazes', 'Luena', 'Luimbale', 'Lutembo'],
  },
  {
    nome: 'Namibe',
    municipios: ['Bibala', 'Camucuio', 'Moçâmedes', 'Tômbwa', 'Virei'],
  },
  {
    nome: 'Uíge',
    municipios: ['Ambuila', 'Bembe', 'Buengas', 'Bungo', 'Damba', 'Maquela do Zombo', 'Mucaba', 'Negage', 'Puri', 'Quitexe', 'Quimbele', 'Sanza Pombo', 'Songo', 'Uíge', 'Zombo'],
  },
  {
    nome: 'Zaire',
    municipios: ['Cuimba', 'M\'banza Congo', 'N\'zeto', 'Noqui', 'Soyo', 'Tomboco'],
  },
];
export const InputForm: React.FC <InputForm> = (props) => {
  return <div className='inputForm'>
    <div className='label'><span>{props.title}</span></div>
    <div className='input-group'>
      <input type={props.type} className='form-control' placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
      <span className='pe-2 ps-2'>
        {props.icon}
      </span> 
    </div>
  </div>
}

export const InputFormTextArea: React.FC <InputForm> = (props) => {
  return <div className='inputForm'>
    <div className='label'><span>Titilo do trabalho</span></div>
    <div className='input-group'>
      <textarea className='form-control' placeholder={props.placeholder} value={props.value} onChange={props.onChange} rows={props.rows}/>
      <span className='pe-2 ps-2'>
        {props.icon}
      </span> 
    </div>
  </div>
}

export const InputFormSelectLocation: React.FC <SelectLocation> = (props) => {
  const [selectedProvincia, setSelectedProvincia] = useState<string>('');
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>('');

  const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvincia(e.target.value);
    setSelectedMunicipio('');
  };
  const handleMunicipioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMunicipio(e.target.value);
  };


  return    <div>
      <h3>Provincia: {selectedProvincia}</h3>
      <select value={selectedProvincia} onChange={handleProvinciaChange}>
        <option value="">Selecione uma província</option>
        {provincias.map((provincia, index) => (
          <option key={index} value={provincia.nome}>
            {provincia.nome}
          </option>
        ))}
      </select>
      <h3>Município:{selectedMunicipio}</h3>
      <select value={selectedMunicipio} onChange={handleMunicipioChange}>
        <option value="">Selecione um município</option>
        {provincias
          .find((provincia) => provincia.nome === selectedProvincia)
          ?.municipios.map((municipio, index) => (
            <option key={index} value={municipio}>
              {municipio}
            </option>
          ))}
      </select>
    </div>
}
 

