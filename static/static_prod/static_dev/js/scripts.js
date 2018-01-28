$(document).ready(function(){       //when the web is ready
   var form = $('#form_buing_product');
    console.log(form);

    function basketUpdating(product_id, nmb, is_delete) {
        //Ajax func
        var data = {};
        data.product_id = product_id;
        data.nmb = nmb;
        data.is_delete = is_delete; //!

        var csrf_token = $('#form_buing_product [name="csrfmiddlewaretoken"]').val();
        console.log(csrf_token);
        data["csrfmiddlewaretoken"] = csrf_token;
        var url = form.attr("action");
        console.log(data);
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            cache: true,
            success: function(data){
                console.log("Ajax OK");
                // console.log(data.products_total_nmb);
                if (data.products_total_nmb || data.products_total_nmb==0){
                    $('#basket_total_nmb').text("("+data.products_total_nmb+")");
                    console.log(data.products);
                    $('.basket-items ul').html("");
                    $.each(data.products, function(k, v){
                        $('.basket-items ul').append("<li>"+v.name+" " +v.nmb+ " шт. по "+v.price_per_item+ " руб.  " +
                        "<a href='' class='delete-item' data-product_id='"+v.id+"'>x</a>"+
                        "</li>");

                    });
                }
            },
            error: function () {
                console.log("error!")
            }
        });

    }

    // when press 'submit' on the form
    form.on('submit', function(e){
        e.preventDefault();
        var nmb = $('#number').val();
        // console.log(nmb);
        var submit_btn =$("#submit_btn");
        var product_id = submit_btn.data("product_id");
        var product_name = submit_btn.data("name");
        var product_price = submit_btn.data("price"); //data attribute
        // console.log(product_id);
        // console.log(product_name);

        basketUpdating(product_id, nmb, is_delete=false);    //when adding new item in basket is_delete = false

    });
    function shovingBasket(){
        $('.basket-items').removeClass("hidden");
    }

    // $('.basket-container').on("click", function (e) {
    //     e.preventDefault();
    //     // $('.basket-items').removeClass("hidden");
    //     shovingBasket();
    // });

    $('.basket-container').mouseover(function (e) {
        // $('.basket-items').removeClass("hidden");
        shovingBasket();
    });


    // $('.basket-container').mouseout(function (e) {
    //     // $('.basket-items').addClass("hidden");
    //     shovingBasket();
    // });

    $(document).on('click', '.delete-item', function (e) {
        e.preventDefault();
        product_id = $(this).data("product_id");
        console.log(product_id, "!!id!!");
        nmb = 0;
        basketUpdating(product_id, nmb, is_delete=true);
        // $(this).closest('li').remove();
    });

    function calculatingBasketAmaunt(){
        total_order_amaunt = 0;
        $('.total-product-in-basket-amount').each(function () {
            total_order_amaunt = total_order_amaunt + parseFloat($(this).text());
        });
        console.log(total_order_amaunt);
        $('#total_order_amount').text(total_order_amaunt.toFixed(2));
    }

    $(document).on('change', '.product-in-basket-nmb', function () {
       var current_nmb = $(this).val();
       var current_tr = $(this).closest('tr');  //указать для поиска текущий элемент tr
       var current_price = parseFloat(current_tr.find('.product-price').text()).toFixed(2);  //затем искать в tr по selector
       var total_amaunt = parseFloat(current_nmb*current_price).toFixed(2);
       current_tr.find('.total-product-in-basket-amount').text(total_amaunt);
       calculatingBasketAmaunt();
    });
    calculatingBasketAmaunt();

});