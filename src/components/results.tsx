import { iIpAddress } from './interfaces';

interface Props {
	data: iIpAddress;
}

export const Results = ({ data }: Props) => {
	return (
		<div className='relative flex flex-col justify-between items-center p-5 w-full rounded-xl h-64 bg-white lg:divide-x lg:w-3/4 lg:flex-row lg:items-start lg:text-left lg:p-6 lg:drop-shadow-lg z-10'>
			<div className='space-y-1 lg:pr-6 lg:w-1/4'>
				<h2 className='text-[.6rem] text-dark-gray font-medium tracking-widest'>
					IP ADDRESS
				</h2>
				<h3 className='text-lg font-semibold text-very-dark-gray lg:text-xl xl:text-2xl'>
					{data.ip}
				</h3>
			</div>
			<div className='space-y-1 lg:px-6 lg:w-1/4'>
				<h2 className='text-[.6rem] text-dark-gray font-medium tracking-widest'>
					LOCATION
				</h2>
				<h3 className='text-lg font-semibold text-very-dark-gray lg:text-xl xl:text-2xl'>
					{`${data.location.city}, ${data.location.region}
					${data.location.postalCode}`}
				</h3>
			</div>
			<div className='space-y-1 lg:px-6 lg:w-1/4'>
				<h2 className='text-[.6rem] text-dark-gray font-medium tracking-widest'>
					TIMEZONE
				</h2>
				<h3 className='text-lg font-semibold text-very-dark-gray lg:text-xl xl:text-2xl'>
					{`UTC ${data.location.timezone}`}
				</h3>
			</div>
			<div className='space-y-1 lg:pl-6 lg:w-1/4'>
				<h2 className='text-[.6rem] text-dark-gray font-medium tracking-widest'>
					ISP
				</h2>
				<h3 className='text-lg font-semibold text-very-dark-gray lg:text-xl xl:text-2xl'>
					{data.isp}
				</h3>
			</div>
		</div>
	);
};
