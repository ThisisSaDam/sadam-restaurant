import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const contacts = [
  {
    locations: [
      '33 Le Duan, Ben Nghe, Q1',
      '211 Phan Van Han, P17, Binh Thanh',
    ],
    phones: [`028.2110.2110`, `028.2002.2002 `],
    socialMedia: [<FacebookIcon />, <InstagramIcon />],
  }
];

const Footer = () => {
  const ContactInfo = contacts.map(contact => 
    <div className='footer'>
      <div>
        <h5>Location</h5>
        <p>{contact.locations[0]}</p>
        <p>{contact.locations[1]}</p>
      </div>
      <div>
        <h5>Phone</h5>
        <p>{contact.phones[0]}</p>
        <p>{contact.phones[1]}</p>
      </div>
      <div>
        <h5>Social media</h5>
        <a href='https://www.facebook.com/Im.dam99' target='blank'>Facebook: {contact.socialMedia[0]}</a>
        <a href='https://www.instagram.com/im.dam22/' target='blank'>Instagram: {contact.socialMedia[1]}</a>
      </div>
    </div>
  );
  return (
    <footer>
      {ContactInfo}
      <h6 className='copy'>Copyright 2023 &copy; SaDam</h6>
    </footer>
  )
}

export default Footer;