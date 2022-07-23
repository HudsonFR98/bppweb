#!/bin/bash

#cmake

sudo apt install build-essential gcc libssl-dev
sudo wget https://github.com/Kitware/CMake/releases/download/v3.23.0-rc2/cmake-3.23.0-rc2.tar.gz
tar xvf cmake-3.23.0-rc2.tar.gz
cd cmake-3.23.0-rc2/
./bootstrap
./bootstrap -- -DCMAKE_USE_OPENSSL=OFF
gmake
sudo make install




# bppsuite

dir = bppsuite
mkdir $dir
cd $dir

export LD_LIBRARY_PATH=/usr/local/lib/
sudo apt install libeigen3-dev

declare -a bpps=("bpp-core" "bpp-seq" "bpp-phyl" "bpp-popgen" "bppsuite")

for bpp in ${bpps[@]}; do
  git clone https://github.com/BioPP/$bpp.git
  cd $bpp
  cmake ./
  make
  sudo make install
  cd ../
done

# the webapp

sudo wget

# python

pip install Flask-SQLAlchemy
pip install Flask-Login
pip install Flask-Session
