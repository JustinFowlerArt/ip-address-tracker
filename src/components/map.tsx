import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { iIpAddress } from './interfaces';

interface Props {
	data: iIpAddress;
}

export const Map = ({ data }: Props) => {
	return (
		<MapContainer
            key={data.ip}
			center={[data.location.lat + .01, data.location.lng]}
			zoom={13}
			zoomControl={false}
			scrollWheelZoom={false}
			className='w-full h-full z-0'
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={[data.location.lat, data.location.lng]}></Marker>
		</MapContainer>
	);
};
