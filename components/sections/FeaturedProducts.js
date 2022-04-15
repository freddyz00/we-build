export default function FeaturedProducts() {
  return (
    <div className="container mx-auto lg:max-w-6xl">
      <h2 className="text-3xl mb-5">Featured Products</h2>
      <div className="grid grid-cols-3 gap-x-5">
        {new Array(3).fill(1).map((_) => (
          <div>
            <div className="bg-red-100 h-80 mb-3"></div>
            <div className="flex justify-between">
              <p>Product</p>
              <p>$9.90</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
