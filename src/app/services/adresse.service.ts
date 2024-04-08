import {Injectable} from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {FormGroup} from "@angular/forms";


export interface AddressSuggestion {
  id: number
  ville: string;
  code_postal: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
  suggestions: AddressSuggestion[] = [];


  constructor(private http: HttpClient) {
  }

  async onSearchChange(searchVille: string | undefined) {

    if (!searchVille) {
      return;
    }
    const gouvUrl = `${environment.apiGouv}${searchVille}&type=municipality&autocomplete=1`;
    const cityName = await fetch(gouvUrl)
    this.suggestions = []
    if (!cityName.ok) {
      console.log("Erreur d'API")
    }

    await cityName.json().then(d => {
      for (let i = 0; i < d['features'].length; i++) {
        this.suggestions.push({
          id: i + 1,
          ville: d['features'][i]['properties']['city'],
          code_postal: d['features'][i]['properties']['postcode']
        });
      }
      console.log(this.suggestions)
    })
    return this.suggestions;
  }

  onSelectSuggestion(suggestion: AddressSuggestion, addressForm: FormGroup) {
    addressForm.get('address')?.setValue(suggestion.ville);
    addressForm.get('codePostal')?.setValue(suggestion.code_postal)
    this.suggestions = [];
  }
}
