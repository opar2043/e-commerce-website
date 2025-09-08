import React, { useEffect, useState } from 'react'

const AdminDashboard = () => {
      const [userData, setUserData] = useState([]);
      
      useEffect(() => {
        fetch('/user.json')
          .then(res => res.json())
          .then(data => setUserData(data))
      }, [])

        const [products, setProducts] = useState([]);

      
        useEffect(() => {
          fetch("/product.json")
            .then((res) => res.json())
            .then((data) => {
              setProducts(data);
            });
        }, []);

  return (
    <div>
        {/* Total Order */}
        {/* Total Products */}
        {/* Total User */}
        {/* Total Revinew */}
    </div>
  )
}

export default AdminDashboard