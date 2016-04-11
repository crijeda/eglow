Billing = new Mongo.Collection("billing");

Billing.attachSchema(new SimpleSchema({

    userId: {
        type: String,
        optional: true,
    },
    address: {
        type: String,
        optional: true,
        label: "Dirección de facturación"
    },
    bank: {
        type: String,
        label:"Banco",
        optional: true,
        autoform: {
          type: "select",
        }
    },
    account: {
        type: String,
        label:"Tipo de Cuenta",
        optional: true,
        autoform: {
          type: "select",
        }
    },
    accountnumber: {
        type: String,
        label: "Número de Cuenta",
    },
    emailaccount: {
        type: String,
        optional: true,
        label:"E-mail para enviar facturas",
        autoform: {
          afFieldInput: {
            type: "email"
          }
        }
    },
    phone: {
        type: String,
        optional: true,
        label: "Teléfono de contacto de facturación"
    }

}));