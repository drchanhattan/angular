import { Album } from '../../components/gallery/album';
import * as asia from './data/asia';
import * as europe from './data/europe';
import * as northAmerica from './data/north-america';
import * as oceania from './data/oceania';
import * as southAmerica from './data/south-america';

export interface ContinentData {
  name: string;
  hero: string;
  albums: Album[];
}

export const CONTINENT_DATA: Record<string, ContinentData> = {
  asia,
  europe,
  'north-america': northAmerica,
  oceania,
  'south-america': southAmerica,
};
