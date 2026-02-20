 "use client";

import Skeleton from "react-loading-skeleton";

interface Props {
  rows?: number;
}

export default function TableSkeletonRows({ rows = 5 }: Props) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          <td className="border p-2">
            <Skeleton height={20} />
          </td>
          <td className="border p-2">
            <Skeleton height={20} />
          </td>
          <td className="border p-2">
            <Skeleton height={20} />
          </td>
          <td className="border p-2">
            <div className="flex gap-2">
              <Skeleton width={60} height={30} />
              <Skeleton width={70} height={30} />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}