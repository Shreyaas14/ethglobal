from flask import Flask, jsonify
import requests
import config

app = Flask(__name__)
port = 3001

@app.route('/ethData')
def get_eth_data():
    try:
        endpoint = "https://api.1inch.dev/portfolio/v2/prices/token_prices/time_range?chain_id=1&contract_address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&currency=usd&granularity=day"
        eth_response = requests.post(endpoint, headers={'Authorization': f'Bearer {config.API_KEY}'})
        eth_response.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code.
        return eth_response.json().get('prices', [])
    except requests.HTTPError:
        return jsonify(error="API request failed", details=eth_response.text), 500
    except Exception as error:
        return jsonify(error=str(error)), 500


@app.route('/polyData')
def get_poly_data():
    try:
        endpoint = "https://api.1inch.dev/portfolio/v2/prices/token_prices/time_range?chain_id=137&contract_address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&currency=usd&granularity=day"
        eth_response = requests.post(endpoint, headers={'Authorization': f'Bearer {config.API_KEY}'})
        return eth_response.json().get('prices', [])
    except Exception as error:
        return jsonify(error=error), 500

@app.route('/bnbData')
def get_bnb_data():
    try:
        endpoint = "https://api.1inch.dev/portfolio/v2/prices/token_prices/time_range?chain_id=56&contract_address=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&currency=usd&granularity=day"
        eth_response = requests.post(endpoint, headers={'Authorization': f'Bearer {config.API_KEY}'})
        return eth_response.json().get('prices', [])
    except Exception as error:
        return jsonify(error=error), 500

if __name__ == '__main__':
    app.run(port=port)
