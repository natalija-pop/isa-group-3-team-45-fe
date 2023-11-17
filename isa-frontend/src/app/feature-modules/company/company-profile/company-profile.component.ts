import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../model/company.model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  selectedNavItem: 'description' | 'companyInfo' | 'equipment' = 'description';
  company: Company = {
    name: 'ABC Corporation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer diam nisi, eleifend in lacinia eu, dignissim sed lacus. In pulvinar orci a massa volutpat semper. Proin sed turpis sit amet enim ullamcorper bibendum at sed ipsum. Nullam cursus at ex sit amet venenatis. Sed varius diam ut posuere egestas. Maecenas consectetur dui at scelerisque bibendum. Aenean sollicitudin elit quam, ut fringilla purus dignissim in. Cras feugiat urna eget mattis finibus. Maecenas eleifend augue nibh, at vehicula urna placerat ac. Integer vestibulum at purus et euismod. Fusce augue ipsum, rutrum ac tincidunt eu, egestas at enim. Aliquam erat volutpat. Morbi in imperdiet magna, eu pellentesque lacus. Vestibulum sollicitudin leo vitae felis congue, vel tempus neque molestie. Etiam a turpis in ipsum cursus eleifend vitae sit amet erat. In quis risus risus. Morbi quis quam id urna blandit condimentum. Nulla vitae est condimentum, tincidunt risus vel, lobortis ante. Quisque maximus orci vitae risus eleifend, nec tempus est fermentum. Fusce ex enim, lobortis eget tortor sit amet, vestibulum imperdiet elit. Nulla nulla purus, tincidunt non scelerisque sed, porttitor ut sem. Praesent accumsan neque quis dignissim porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eu semper eros, non ultricies ante. Nam vitae dui dapibus, porta augue nec, porttitor felis. Donec eu eros ex. Nullam rhoncus massa lacus, hendrerit aliquam arcu fermentum dapibus. Ut tincidunt egestas blandit. Mauris ut elementum quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere mi nec enim elementum, eget tempor urna malesuada. Vestibulum ac arcu turpis. Nam facilisis accumsan vehicula. Curabitur id eleifend nunc. Praesent eu dictum eros, in posuere felis. Aenean vehicula rhoncus justo quis molestie. Nunc nec orci finibus, pretium felis id, porta massa. Donec aliquet mattis ipsum ac mattis. Vivamus ut pellentesque mauris. Nullam id cursus mauris. Nunc in leo varius turpis laoreet aliquam. Vivamus porta ante eget porta ultrices. Donec leo neque, tincidunt et gravida consequat, pellentesque a magna. Duis volutpat ante id metus lacinia, non tincidunt arcu malesuada. Suspendisse posuere eu purus vitae maximus. Phasellus ut nisl elit. In rhoncus tristique ex eu ullamcorper. Phasellus in dolor id risus cursus placerat vitae at eros',
    address: {
      street: '123 Main Street',
      number: 456,
      city: 'Cityville',
      country: 'Countryland',
    },
  };

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    
  }

  getCompanyById(): void {

  }

  showDescription() {
    this.selectedNavItem = 'description';
  }

  showCompanyInfo() {
    this.selectedNavItem = 'companyInfo';
  }

  showEquipment() {
    this.selectedNavItem = 'equipment';
  }
}
