import React from "react";
import {Button, Col, Icon, Row, RSelect} from "../../../components";
import {Modal, ModalBody} from "reactstrap";
import {useForm} from "react-hook-form";
import {store as storeOrder} from "../../../utils/api/order"

export const Add = ({modal, setModal, formData, setFormData, setDataRefresh}) => {
    const typeOptions = [
        {value: 'Anak', label: 'Anak'},
        {value: 'Dewasa', label: 'Dewasa'}
    ]
    const sizeOptions = [
        { value: "XS", label: "XS" },
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
        { value: "XXL", label: "XXL" },
        { value: "3XL", label: "3XL" },
    ]
    const armOptions = [
        {value: 'Pendek', label: 'Pendek'},
        {value: 'Panjang', label: 'Panjang'},
    ]
    const paymentOptions = [
        {value: '1', label: 'Tunai'},
        {value: '2', label: 'Virtual Account'},
    ]
    const onFormSubmit = () => {
        storeOrder(formData).then(() => {
            setModal({ add: false, details: false });
            resetForm();
            setDataRefresh(true);
        });
    };
    const resetForm = () => {
        setFormData({
            id: null,
            code: "",
            name: "",
            phone: "",
            address: "",
            type: "",
            size: "",
            arm: "",
            price: 0,
            payment: '',
            check: false,
        });
    };
    const toggle = () => {
        resetForm();
        setModal({add: false, details: false});
    }

    const {register, handleSubmit, formState: {errors}} = useForm();

    return(
        <Modal isOpen={modal.add} toggle={() => toggle()} className="modal-dialog-centered" size="lg">
            <ModalBody>
                <div className="p-2">
                    <h5 className="title">Tambah Pesanan</h5>
                    <div className="mt-4">
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <Row className="g-3">
                                <Col md="12">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register('name', {
                                                    required: "Kolom tidak boleh kosong",
                                                })}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                value={formData.name}
                                                placeholder="Nama Pemesan"
                                            />
                                            {errors.name && <span className="invalid">{errors.name.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register('phone', { required: "Kolom tidak boleh kosong." })}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="Nomor WA"
                                            />
                                            {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register('address', { required: "Kolom tidak boleh kosong." })}
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                placeholder="Alamat"
                                            />
                                            {errors.address && <span className="invalid">{errors.address.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <RSelect
                                                name="type"
                                                options={typeOptions}
                                                value={typeOptions.find((e) => e.value === formData.type)}
                                                onChange={(e) => setFormData({ ...formData, type: e.value })}
                                                placeholder="Pilih Jenis"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <RSelect
                                                name="size"
                                                options={sizeOptions}
                                                onChange={(e) => setFormData({ ...formData, size: e.value })}
                                                value={sizeOptions.find((e) => e.value === formData.size)}
                                                placeholder="Pilih Ukuran"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <RSelect
                                                name="arm"
                                                options={armOptions}
                                                onChange={(e) => setFormData({ ...formData, arm: e.value })}
                                                value={armOptions.find((e) => e.value === formData.arm)}
                                                placeholder="Pilih Lengan"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <RSelect
                                                name="payment"
                                                options={paymentOptions}
                                                onChange={(e) => setFormData({ ...formData, payment: e.value })}
                                                value={paymentOptions.find((e) => e.value === formData.payment)}
                                                placeholder="Metode Pembayaran"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col md="6">
                                    <div className="form-group">
                                        <div className="form-control-wrap">
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register('price', { required: "Kolom tidak boleh kosong." })}
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                placeholder="Total Pembayaran"
                                                disabled={true}
                                            />
                                            {errors.price && <span className="invalid">{errors.price.message}</span>}
                                        </div>
                                    </div>
                                </Col>
                                <Col size="12">
                                    <Button color="primary" type="submit">
                                        <Icon className="plus"></Icon>
                                        <span>Simpan</span>
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}