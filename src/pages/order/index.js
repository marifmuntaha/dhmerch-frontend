import React, {useEffect, useState} from "react";
import {
    Block,
    BlockContent,
    BlockDes,
    BlockHead,
    BlockTitle,
    Button,
    Icon,
    PreviewCard,
    RSelect
} from "../../components";
import Head from "../../layout/head";
import {Alert, Card, Col, Form, Row, Spinner} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import Logo from '../../assets/images/logo.png'
import {useDispatch, useSelector} from "react-redux";
import {resetOrder, setOrder, storeOrder} from "../../redux/order/actions";


const Order = () => {
    const dispatch = useDispatch();
    const {order, success, error, loading} = useSelector(state => state.order);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [whatsapp, setWhatsapp] = useState('')
    const [product, setProduct] = useState();
    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [arm, setArm] = useState();
    const [payment, setPayment] = useState();
    const [price, setPrice] = useState()
    const [sizeOptions, setSizeOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const ProductOptions = [
        {value: 1, label: "KAOS MIDHA 2024"},
        {value: 2, label: "KAOS TULANG PUNGGUNG"},
        {value: 3, label: "KAOS MADHA 2024"},
        {value: 4, label: "KAOS HARLAH 2024"},
        {value: 5, label: "KAOS RA DARUL HIKMAH"},
        {value: 6, label: "KAOS PONPES DARUL HIKMAH"},
        {value: 7, label: "KAOS NGAJI NGOPI NGABDI"},
    ]
    const handleOptionsize = (product) => {
        switch (product) {
            case 1:
                return [
                    {value: 1, label: "0"},
                    {value: 2, label: "1"},
                    {value: 3, label: "2"},
                    {value: 4, label: "S"},
                    {value: 5, label: "M"},
                    {value: 6, label: "L"},
                    {value: 7, label: "XL"},
                    {value: 8, label: "XXL"},
                    {value: 9, label: "XXXL"},
                ];
            case 2:
                return [
                    {value: 4, label: "S"},
                    {value: 5, label: "M"},
                    {value: 6, label: "L"},
                    {value: 7, label: "XL"},
                    {value: 8, label: "XXL"},
                    {value: 9, label: "XXXL"},
                ]
            case 3:
                return [
                    {value: 4, label: "S"},
                    {value: 5, label: "M"},
                    {value: 6, label: "L"},
                    {value: 7, label: "XL"},
                    {value: 8, label: "XXL"},
                    {value: 9, label: "XXXL"},
                ]
            case 4:
                return [
                    {value: 4, label: "S"},
                    {value: 5, label: "M"},
                    {value: 6, label: "L"},
                    {value: 7, label: "XL"},
                    {value: 8, label: "XXL"},
                    {value: 9, label: "XXXL"},
                ]
            case 5:
                return [
                    {label: 'Anak-anak', options: [
                            {value: 10, label: "0"},
                            {value: 11, label: "1"},
                            {value: 12, label: "2"},
                            {value: 13, label: "3"},
                            {value: 14, label: "XS"},
                            {value: 15, label: "S"},
                        ]},
                    {label: 'Dewasa', options: [
                            {value: 4, label: "S"},
                            {value: 5, label: "M"},
                            {value: 6, label: "L"},
                            {value: 7, label: "XL"},
                            {value: 8, label: "XXL"},
                            {value: 9, label: "XXXL"},
                        ]}
                ]
            case 6:
                return [
                    {value: 4, label: "S"},
                    {value: 5, label: "M"},
                    {value: 6, label: "L"},
                    {value: 7, label: "XL"},
                    {value: 8, label: "XXL"},
                    {value: 9, label: "XXXL"},
                ]
            case 7:
                return [
                    {value: 4, label: "S"},
                    {value: 5, label: "M"},
                    {value: 6, label: "L"},
                    {value: 7, label: "XL"},
                    {value: 8, label: "XXL"},
                    {value: 9, label: "XXXL"},
                ]
            default:
                return [];
        }
    }
    const handleOptionColor = (product) => {
        switch (product) {
            case 1:
                return [
                    {value: 1, label: 'Hitam'},
                    {value: 2, label: 'Merah'}
                ]
            case 2:
                return [
                    {value: 3, label: 'Hitam'}
                ]
            case 3:
                return [
                    {value: 4, label: 'Coklat Susu'},
                    {value: 5, label: 'Putih'}
                ]
            case 4:
                return [
                    {value: 6, label: 'Hitam'}
                ]
            case 5:
                return [
                    {value: 7, label: 'Hitam'},
                    {value: 8, label: 'Hijau Botol'},
                ]
            case 6:
                return [
                    {value: 9, label: 'Biru'},
                    {value: 10, label: 'Merah Muda'},
                ]
            case 7:
                return [
                    {value: 11, label: 'Hitam'}
                ]
            case 8:
                return [
                    {value: 11, label: 'Hitam'}
                ]
            default:
                return []
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(storeOrder({formData: {
                nama: name,
                whatsapp: whatsapp,
                produk: product ? product.label : '',
                ukuran: size ? size.label : '',
                warna: color ? color.label : '',
                lengan: arm ? arm.label : '',
                pembayaran: payment ? payment : {},
            }}))
    }

    useEffect(() => {
        setSizeOptions(handleOptionsize( product && product.value));
        setColorOptions(handleOptionColor( product && product.value));
    }, [product]);

    useEffect(() => {
        const sizeChild = [1,2,3,10,11,12,13,14,15];
        const sizeSmall = [4, 5, 6];
        const sizeMedium = [7, 8];
        const sizeLarge = [9];
        if (arm && arm.value === 2){
            sizeChild.includes(size && size.value) && setPrice('Rp. 75.000');
            sizeSmall.includes(size && size.value) && setPrice('Rp. 80.000');
            sizeMedium.includes(size && size.value) && setPrice('Rp. 85.000');
            sizeLarge.includes(size && size.value) && setPrice('Rp. 105.000');
        }
        if (arm && arm.value === 1){
            sizeChild.includes(size && size.value) && setPrice('Rp. 75.000');
            sizeSmall.includes(size && size.value) && setPrice('Rp. 85.000');
            sizeMedium.includes(size && size.value) && setPrice('Rp. 95.000');
            sizeLarge.includes(size && size.value) && setPrice('Rp. 110.000');
        }
    }, [size, arm]);

    useEffect(() => {
        dispatch(resetOrder());
    }, [dispatch])

    useEffect(() => {
        success && dispatch(setOrder(order)) && navigate('/sukses')
    }, [success]);

    return (
        <>
            <Head title="ORDER KAOS DH MERCH 2024"/>
            <Block className="nk-block-middle nk-auth-body wide-xs">
                <div className="brand-logo pb-4 text-center">
                    <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
                        <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo"/>
                        <img className="logo-dark logo-img logo-img-lg" src={Logo} alt="logo-dark"/>
                    </Link>
                </div>
                <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
                    <BlockHead>
                        <BlockContent>
                            <BlockTitle tag="h4">DH MERCH 2024</BlockTitle>
                            <BlockDes>
                                <p>Silahkan melengkapi data pemesanan</p>
                            </BlockDes>
                        </BlockContent>
                    </BlockHead>
                    <Form className="form-validate is-alter">
                        {error && (typeof error === 'string') && (
                            <Alert className="alert-icon" color="danger">
                                <Icon name="alert-circle" />
                                <strong>Kesalahan</strong>.
                            </Alert>
                        )}
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="name">Nama Lengkap</label>
                            </div>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Masukkan nama lengkap."
                                    className="form-control-lg form-control"
                                    onChange={(val) => {
                                        setName(val.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="whatsapp">Nomor Whatsapp</label>
                            </div>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="whatsapp"
                                    placeholder="Masukkan Nomor Whatsapp"
                                    className="form-control-lg form-control"
                                    onChange={(val) => {
                                        setWhatsapp(val.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-label-group">
                                <label className="form-label" htmlFor="product">Produk</label>
                            </div>
                            <div className="form-control-wrap">
                                <RSelect
                                    options={ProductOptions}
                                    value={product}
                                    onChange={(val) => {
                                        setPrice('');
                                        setArm([]);
                                        setSize([]);
                                        setColor([]);
                                        setProduct(val);
                                    }}
                                    placeholder="Pilih Produk"
                                />
                            </div>
                            <span>Gambar produk <Link to="/">lihat disini</Link></span>
                        </div>
                        <Row className="gy-2">
                            <Col md="12" sm="6" lg="6">
                                <div className="form-group">
                                    <div className="form-label-group">
                                        <label className="form-label" htmlFor="size">Ukuran</label>
                                    </div>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={sizeOptions}
                                            value={size}
                                            onChange={(val) => {
                                                setArm([]);
                                                setPrice([]);
                                                setSize(val);
                                            }}
                                            placeholder="Pilih Ukuran"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md="12" sm="6" lg="6">
                                <div className="form-group">
                                    <div className="form-label-group">
                                        <label className="form-label" htmlFor="color">Warna</label>
                                    </div>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={colorOptions}
                                            value={color}
                                            onChange={(val) => setColor(val)}
                                            placeholder="Pilih Warna"
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col md="12" sm="6" lg="12">
                                <div className="form-group">
                                    <div className="form-label-group">
                                        <label className="form-label" htmlFor="arm">Lengan</label>
                                    </div>
                                    <div className="form-control-wrap">
                                        <RSelect
                                            options={[
                                                {value: 1, label: "Panjang"},
                                                {value: 2, label: "Pendek"},
                                            ]}
                                            value={arm}
                                            onChange={(val) => setArm(val)}
                                            placeholder="Pilih Ukuran"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {price && (
                            <>
                                <Card className="mt-2 text-center p-3">
                                    <h4 className="text-danger">Harga: {price}</h4>
                                    <p> Silahkan melakukan pembayaran melalui No. Rekening BRI. 5889 01 057293 53 6 a.n QOMARIYAH</p>
                                    <p> dan unggah bukti pembayaran disini.</p>
                                </Card>
                            </>
                        )}
                        <div className="form-group mt-2">
                            <label className="form-label" htmlFor="payment">Bukti Pembayaran</label>
                            <div className="form-control-wrap">
                                <div className="form-file">
                                    <input type="file" id="upload" className="form-control" required={true} onChange={(val) => {
                                        setPayment(val.target.files[0]);
                                    }}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <Button size="lg" className="btn-block" type="submit" color="success" onClick={(e) => handleSubmit(e)}>
                                {loading ? <Spinner size="sm" color="light"/> : "KIRIM"}
                            </Button>
                        </div>
                    </Form>
                </PreviewCard>
            </Block>
        </>
    );
};
export default Order;
