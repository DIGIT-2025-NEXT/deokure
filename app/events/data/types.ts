export interface City {
  id: string;
  label: string;
}

export interface Tag {
  id: string;
  label: string;
  color?: 'default' | 'primary' | 'secondary';
  customStyle?: React.CSSProperties;
}

export interface Event {
  id: string;
  title: string;
  city: City;
  tags: Tag[];
  createdAt?: Date;
  updatedAt?: Date;
}