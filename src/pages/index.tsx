import Head from "next/head";
import styles from "../styles/dashboard.module.scss";

import { FiRefreshCcw } from "react-icons/fi";
import Header from "@/components/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useEffect, useState } from "react";
import { orderService } from "@/services/order";
import { ModalOrder } from "@/components/ModalOrder";
import { GetOrderDetailsResponse } from "@/services/order/order.types";
import { toast } from "react-toastify";

type Order = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
};

const Dashboard = () => {
  const [orderList, setOrderList] = useState<Order[]>();
  const [modalItem, setModalItem] = useState<GetOrderDetailsResponse[]>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModalView = async (order_id: string) => {
    const res = await orderService.getOrderDetails(order_id);

    if (res) {
      setModalItem(res);
      setModalVisible(true);
    }
  };

  const handleFinishOrder = async (order_id: string) => {
    const res = await orderService.finishOrder(order_id);

    if (res) {
      toast.success(res.message);
      setModalVisible(false);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await orderService.listOrders();
      setOrderList(res);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Painel - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOreders}>
            {orderList?.map(({ name, id }) => (
              <section
                key={id}
                className={styles.orderItem}
                onClick={() => handleOpenModalView(id)}
              >
                <button>
                  <div className={styles.tag}></div>
                  <span>{name}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            order={modalItem!}
            handleFinishOrder={handleFinishOrder}
          />
        )}
      </div>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});

export default Dashboard;
