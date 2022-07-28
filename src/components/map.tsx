import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { iIpAddress } from './interfaces';

interface Props {
	data: iIpAddress;
}

export const Map = ({ data }: Props) => {
	const latRef = useRef(data.location.lat);
	const latValue = latRef.current;

	const lngRef = useRef(data.location.lng);
	const lngValue = latRef.current;

	useEffect(() => {
		latRef.current = data.location.lat;
		lngRef.current = data.location.lng;
	}, [data]);

	return (
		<MapContainer
			center={[latValue, lngValue]}
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
