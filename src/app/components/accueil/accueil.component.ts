import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MessageService} from "../../services/message.service";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

  message: string | null = null;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.message = this.messageService.getMessage();
    this.messageService.setMessage('');
  }

}
