export default function MinItem({ max, min }) {
	return (
		<div className="markets-small">
			<span className="big-text">{max[0]}</span>
			{min && <span className="small-text">{min}</span>}
		</div>
	);
}
