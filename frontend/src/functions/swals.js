import swal from 'sweetalert';

const alertMetamask = () => {
    swal({
        title: "Error!",
        text: "Get Metamask",
        icon: "error",
        button: "Ok"
    });
}

const alertCantMint = () => {
    swal({
        title: "Error!",
        text: "You can't mint more than one NFT",
        icon: "error",
    })
}



export {alertMetamask, alertCantMint};