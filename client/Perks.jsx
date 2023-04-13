export default function Perks({ selected, onChange }) {
  let checkStyle = "border p-4 flex rounded-2xl gap-2 items-center";

  return (
    <>
      <label className={checkStyle}>
        <input type="checkbox" />
        <span>Wifi</span>
      </label>
      <label className={checkStyle}>
        <input type="checkbox" />
        <span>Free parking</span>
      </label>
      <label className={checkStyle}>
        <input type="checkbox" />
        <span>pets</span>
      </label>
      <label className={checkStyle}>
        <input type="checkbox" />
        <span>View</span>
      </label>
      <label className={checkStyle}>
        <input type="checkbox" />
        <span>Close to mrt</span>
      </label>
    </>
  );
}
