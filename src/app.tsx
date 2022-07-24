import { useState } from 'react';

export const App = () => {
	const [search, setSearch] = useState('');

	const handleChange = (ipAddress: string) => {
		setSearch(ipAddress);
	};
	return (
		<div className='h-screen'>
			<div
				className='h-1/3 flex flex-col justify-center items-center'
				style={{ backgroundImage: 'url(/images/pattern-bg.png)' }}
			>
				<h1 id='title' className='text-3xl font-bold'></h1>
				<form>
					<input
						type='text'
						value={search}
						className=''
						onChange={e => handleChange(e.target.value)}
					></input>
				</form>
			</div>
		</div>
	);
};
