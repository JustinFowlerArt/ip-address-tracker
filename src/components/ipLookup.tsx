interface Props {
	search: string;
	handleChange: (ipAddress: string) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const IpLookup = ({ search, handleChange, handleSubmit }: Props) => {
	return (
		<form
			className='relative h-14 w-full md:w-1/2 lg:w-2/5'
			onSubmit={e => handleSubmit(e)}
		>
			<input
				type='text'
				value={search}
				className='w-full h-full text-lg py-3 pl-5 pr-16 rounded-xl'
				placeholder='Search for any IP address or domain'
				onChange={e => handleChange(e.target.value)}
			></input>
			<button className='absolute right-0 h-full aspect-square bg-black p-2 rounded-r-xl hover:opacity-75'>
				<img className='mx-auto' src='/images/icon-arrow.svg'></img>
			</button>
		</form>
	);
};
