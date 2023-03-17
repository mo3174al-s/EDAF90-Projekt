import { Component } from '@angular/core';

@Component({
  selector: 'app-meny-bar',
  templateUrl: './meny-bar.component.html',
  styleUrls: ['./meny-bar.component.css']
})
export class MenyBarComponent {
  navLinks = [
    { label: 'Hem', path: '/hem', panel: 'hem-tab', },
    { label: 'Boka', path: '/boka', panel: 'boka-tab', },
    { label: 'Hitta bokning', path: '/hitta%20bokning', panel: 'hitta-bokning-tab' }
  ];

}


