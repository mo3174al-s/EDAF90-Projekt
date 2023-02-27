import { Component } from '@angular/core';

@Component({
  selector: 'app-meny-bar',
  templateUrl: './meny-bar.component.html',
  styleUrls: ['./meny-bar.component.css']
})
export class MenyBarComponent {
  navLinks = [
    { label: 'Hem', path: '/hem' },
    { label: 'Boka', path: '/boka' },
    { label: 'Hitta bokning', path: '/hitta%20bokning' }
  ];

}


