#!/bin/sh

curl -sL https://www.cdc.gov/ecoli/outbreaks.html |
2041 pup 'div[class="col-md-12"] a' |
grep -E '".*\.html"' |
sed -r 's/^<a href=|>$//g' |
tr -d '"'|
sed -r 's?/|http://www.cdc.gov/?http://www.cdc.gov/?' |
grep -P '\d{4}' |
while read link
do
    sleep 1
    # echo "$link"
    lines=$(curl -sL "$link")

    title=$(
        echo "$lines" |
        2041 pup 'h1 text{}' |
        tr -d '\n' |
        sed -r 's/$/\n/' |
        sed -r 's/\s+/ /g'
    )

    # echo "$title"

    posted=$(
        echo "$lines" |
        2041 pup --color 'div[class="card-body p-0"] > p, div[class="card-body p-0 bg-white"] > p, div[class="card-body pt-0 bg-white"] > p, div[class="card-body bg-white"] > p text{}' |
        grep -v '^$' |
        head -1 |
        sed -r 's/^(Posted(\Won)?\W)?//' |
        sed -r 's/([0-9]{4}).*$/\1/'
    )

    if [ -z "$posted" ]
    then
        continue
    fi

    posted=$(date --date="$(printf "%s" "$posted")" +"%Y-%m-%d")

    # echo "$posted"

    map=$(
        echo "$link" |
        sed -r 's?^http://www.cdc.gov(.*/)[^/]+\.html$?\1map.html?' |
        tr 'A-Z' 'a-z'
    )

    info=$(
        echo "$lines" |
        2041 pup "div[class=\"card-body bg-tertiary\"]  :parent-of(:parent-of([href=\"$map\"]))" |
        sed '/^<\/ul>$/q'
    )

    cases=$(
        echo "$info" |
        2041 pup --color 'li:first-of-type text{}' |
        sed -r 's/^\s+|\s+$//g' |
        grep -v  '^$' |
        tr '\n' ' ' |
        sed -r 's/[^0-9]//g'
    )

    # echo "$cases"

    hosps=$(
        echo "$info" |
        2041 pup --color ':contains("Hospitalizations") text{}' |
        sed -r 's/^\s+|\s+$//g' |
        grep -v  '^$' |
        sed -r 's/[^0-9%]//g'
    )

    if echo "$hosps" | grep -F '%' > /dev/null 2>&1
    then
        hosps=$(
            echo "$hosps" |
            tr -d '%'
        )
        hosps=$(( $cases * $hosps / 100 ))
    fi

    # echo "$hosps"

    deaths=$(
        echo "$info" |
        2041 pup --color ':contains("Deaths") text{}' |
        sed -r 's/^\s+|\s+$//' |
        grep -v  '^$' |
        sed -r 's/[^0-9]//g'
    )

    python3 firestore_client.py "$link" "$title" "" "$posted" "$cases" "$hosps" "$deaths" || exit

    # exit

    # echo "$deaths"

    # echo -e "\\n\\n--------------------------------------------------------------------------------------------------------\\n"
done
