import { assets, features } from "../assets/assets";

function TheBest() {
  return (
    <div className="pb-20">
      <div className="bg-[#e9f5f1] flex flex-col md:flex-row items-center justify-between gap-6 p-5">

        {/* Image */}
        <div className="flex-1 justify-center">
          <img src={assets.thebest_img} alt="vegitable_image" />
        </div>

        <div className="flex-1 flex justify-center">
          <div>
            <h2 className="mb-5 text-3xl font-semibold text-primary">Why We Are the Best?</h2>
            <div className="flex flex-col gap-2">
              {
                features.map((feat, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <img src={feat.icon} alt="delivery_truck" />
                    <div>
                      <h3 className="text-xl font-semibold text-green-600">{feat.title}</h3>
                      <p className="text-sm text-gray-600">{feat.description}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TheBest;