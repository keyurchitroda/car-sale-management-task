import Modal from "../../components/common/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CommissionRulesModal = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={onClose} title="Commission Rules">
      <div className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border p-3 text-left">Brand</th>
                <th className="border p-3 text-left">Fixed Commission</th>
                <th className="border p-3 text-center">Class A</th>
                <th className="border p-3 text-center">Class B</th>
                <th className="border p-3 text-center">Class C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">Audi</td>
                <td className="border p-3">$800 (price &gt; 25,000)</td>
                <td className="border p-3 text-center">8%</td>
                <td className="border p-3 text-center">6%</td>
                <td className="border p-3 text-center">4%</td>
              </tr>
              <tr>
                <td className="border p-3">Jaguar</td>
                <td className="border p-3">$750 (price &gt; 35,000)</td>
                <td className="border p-3 text-center">6%</td>
                <td className="border p-3 text-center">5%</td>
                <td className="border p-3 text-center">3%</td>
              </tr>
              <tr>
                <td className="border p-3">Land Rover</td>
                <td className="border p-3">$850 (price &gt; 30,000)</td>
                <td className="border p-3 text-center">7%</td>
                <td className="border p-3 text-center">5%</td>
                <td className="border p-3 text-center">4%</td>
              </tr>
              <tr>
                <td className="border p-3">Renault</td>
                <td className="border p-3">$400 (price &gt; 20,000)</td>
                <td className="border p-3 text-center">5%</td>
                <td className="border p-3 text-center">3%</td>
                <td className="border p-3 text-center">2%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
          <p className="text-sm text-indigo-900">
            <strong>Additional Rule:</strong> If a salesman’s previous year
            sales exceed <strong>$500,000</strong>, an extra <strong>2%</strong>{" "}
            commission is added on <strong>Class A cars only</strong>.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CommissionRulesModal;
