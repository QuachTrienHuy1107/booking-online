import { Modal } from "antd";
import React from "react";
import "../../styles/components/shared/_modal.scss";

const ModalCustom: React.FC = () => {
    const [open, setOpen] = React.useState(false);

    const handleOk = () => {
        setOpen(!open);
    };

    const handleCancle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <a onClick={() => setOpen(true)} style={{ marginBottom: 0, display: "inline-block" }}>
                <img
                    src="https://in.bmscdn.com/moviemode/cinemaphotoshowcase/safety_first.png"
                    alt=""
                    style={{
                        display: "inline-block",
                        width: 20,
                        transform: "translateY(5px)",
                    }}
                />
                INFO
            </a>
            <Modal
                className="modal-custom"
                visible={open}
                onOk={handleOk}
                onCancel={handleCancle}
                centered
                footer={<div style={{ padding: 0 }}></div>}
                width={520}
                style={{ padding: 0, border: "none" }}
                closable={false}
            >
                <iframe
                    title="123"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.516175095571!2d106.70230491477143!3d10.771721892324727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fae3ea605ab%3A0x2afaf7f3826e5c42!2sBHD%20Star%20Cineplex!5e0!3m2!1svi!2s!4v1623169068723!5m2!1svi!2s"
                    width="600"
                    height="450"
                    className="video"
                    allowFullScreen={true}
                    loading="lazy"
                ></iframe>
            </Modal>
        </div>
    );
};
export default ModalCustom;
