import appstore from '@assets/appstore.png';
import googlePlay from '@assets/googlePlay.png';

const ClientFooter = () => {
  return (
    <footer
      data-testid="ClientFooter"
      className="w-full h-20 p-4 mt-auto bg-sky-900"
    >
      <div className="flex items-center justify-between w-full">
        <ul className="flex gap-3 font-thin leading-4 text-white divide-x divide-white">
          <li className="pr-2">
            <span>About us</span>
          </li>
          <li className="pl-3">
            <span>Terms and Conditions</span>
          </li>
          <li className="pl-3">
            <span>Contact us</span>
          </li>
        </ul>
        <ul className="flex gap-6 leading-4 text-white">
          <li className="pt-5 pr-8">
            <span>UX AIR APP</span>
          </li>
          <li>
            <img className="w-40 h-11" alt={'googlePlay'} src={appstore}></img>
          </li>
          <li>
            <img className="w-40 h-11" alt={'appStore'} src={googlePlay}></img>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default ClientFooter;
