
import AsyncSelect from 'react-select/async';
import {components} from 'react-select';
import {AiFillFlag} from 'react-icons/ai';
// option for react select which display flag image alongside country name
function Option(props) {
  // load default image if error 
  const onError = (e) => {
    e.target.src = 'https://i.redd.it/duiz6eq80q651.png';
  }
  return (
    <components.Option {...props}>
      <span className='flex'>
      <img src={props.data.value} onError={onError} alt={props.data.label} className="w-4 mr-2" />
      {props.data.label}
      </span>
    </components.Option>
  );
}

// multi value component for react select which display flag image alongside country name
function MultiValue(props) {
  const onError = (e) => {
    e.target.src = 'https://i.redd.it/duiz6eq80q651.png';
  }
  return (
    <components.MultiValue {...props}>
      <span className='flex'>
      <img src={props.data.value} alt={props.data.label} onError={onError} className="w-5 mr-2" />
      {props.data.label}
      </span>
    </components.MultiValue>
  );
}

function DropdownIndicator(props) {
  return (
    <components.DropdownIndicator {...props}>
      <AiFillFlag className='text-xl'/>
    </components.DropdownIndicator>
  );
}

export default function CountrySelect({flags}) {
  const options = flags.map((flag) => ({label: flag.name, value: flag.image}));
  // filter options based on input value act as api call
  const fetchOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase())));
    }, 200);
    };
  const popularCountries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Ireland', 'New Zealand', 'Brazil', 'Argentina', 'Chile', 'Mexico', 'Colombia', 'Peru', 'Venezuela', 'South Africa']
  const defaultOptions = options.filter((option) => popularCountries.includes(option.label));
  return (
    <div className='w-3/4 md:w-1/2 border p-4 shadow-sm'>
      <h3 className="p-2 mb-1 text-md">Your Country?</h3>
      <AsyncSelect isMulti components={{Option,MultiValue,DropdownIndicator}} defaultOptions={defaultOptions} loadOptions={fetchOptions} />
      <span className='text-xs text-gray-500'>Try searching for the country, if not already exist in the list</span>
    </div>
  )
}
