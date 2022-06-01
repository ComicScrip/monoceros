export default function DeliveriesStatus({
  inProgress,
  delayed,
  completed,
  total,
}) {
  const containerWidth = 70;
  const unit = containerWidth / total;
  const inProgressWidth = Math.ceil(unit * inProgress);
  const delayedWidth = Math.ceil(unit * delayed);
  const completedWidth = Math.ceil(unit * completed);
  return (
    <div className="flex flex-col w-4/6">
      <div className="mb-[10px] flex items-center justify-between">
        <p>In progress{inProgress}</p>
        <div className={`bg-[#eae5e5] w-[${containerWidth}%] h-[15px] rounded`}>
          <div
            style={{ width: `${inProgressWidth}%` }}
            className="h-[15px] bg-red-600 rounded"
          ></div>
        </div>
      </div>
      <div className="mb-[10px] flex items-center justify-between">
        <p>Delayed{delayed}</p>
        <div className="bg-[#eae5e5] w-[70%] h-[15px] rounded">
          <div
            style={{ width: `${delayedWidth}%` }}
            className="h-[15px] bg-red-600 rounded"
          ></div>
        </div>
      </div>
      <div className="mb-[10px] flex items-center justify-between">
        <p>Completed{completed}</p>
        <div className="bg-[#eae5e5] w-[70%] h-[15px] rounded">
          <div
            style={{ width: `${completedWidth}%` }}
            className="h-[15px] bg-red-600 rounded"
          ></div>
        </div>
      </div>
      <p>Total {total}</p>
    </div>
  );
}
